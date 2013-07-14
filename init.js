// Initializes FBMeet and FBMeet.Chat to use as a namespace
FBMeet = {
    localStorageTokenKey: 'FBMeetToken',
    Chat: {}
};

// Have to make the background script send a message to the content script with the proper
// token, and have the content script pick the token and set it in its local storage.
// Make message sending and retrieving also
FBMeet.Loader = {

    load: function(e) {
        //this.loadAPI();
        this.observeChat();
        this.retrieveToken();
        chrome.runtime.onMessage.addListener(this.messageListener);
    },

    messageListener: function(data, sender, callback) {
        if (data.request == 'setToken') {
            console.log('CS: Received "setToken" message from BS');
            if (data.token) {
                console.log('CS: It had a valid token, gonna test it');
                FBMeet.token = data.token;
                FBMeet.Loader.testToken();
            } else { 
                console.log('CS: It gave me a non valid token(' + data.token + '), getting a new one');
                FBMeet.Loader.newToken();
            }
        }
    },

    testToken: function() {
        console.log('CS: Testing token')
        FB.get('/me').done(function(response, status, xhr) {
            console.log('CS: Token ok')
        }).fail(function(xhr, status, error) {
            if (xhr.status === 400) {
                var response = null;
                try {
                    response = $.parseJSON(xhr.responseText);
                    if (response.error.type === 'OAuthException') {
                        console.log('CS: Token had problems, getting a new one');
                        FBMeet.Loader.newToken();
                    } else { response = null; }
                } catch(e) { 
                    console.log('Got error parsing response, ' + e);
                    response = null;
                }
                if (response === null) {
                    console.log('CS: FBMeet: 400 response, but not OAuthException, please check.');
                }
            } else {
                console.log('CS: FBMeet: Request failed but not 400, please check.');
            }
        });
    },

    newToken: function() {
        chrome.runtime.sendMessage({
            request: 'newToken'
        });
        console.log('CS: Sent "newToken" message to BS');
    },

    retrieveToken: function() {
        chrome.runtime.sendMessage({
            request: 'getToken'
        });        
        console.log('CS: Sent "getToken" message to BS');
    },    

    observeChat: function(e) {
        var $tabs = $('#ChatTabsPagelet .fbNubGroup.clearfix.videoCallEnabled');
        // No chat for us to modify =(
        if ($tabs.length == 0) return;
        // For chat windows that are already there when the page loads
        $tabs.children().each(function(i, item) {
            FBMeet.Chat.Window.build($(item));
        });
        // For chat windows that are created by the user afterwards
        var observer = new WebKitMutationObserver(function() {
            var counter = $tabs.children().length;
            var instances = FBMeet.Chat.Window.instances;
            if (counter > instances) {
                FBMeet.Chat.Window.build($tabs.children(':first'));
            } else if (counter < instances) {
                FBMeet.Chat.Window.instances = counter;
            }
        });
        observer.observe($tabs[0], {'childList': true});
    },

};

$(document).ready(function(e) {
    //TODO: Use bind to this (check if it does not bind) 
    //and pass function directly throught parameter
    FBMeet.Loader.load(e);
});
