// Initializes FBMeet and FBMeet.Chat to use as a namespace
FBMeet = {
    localStorageTokenKey: 'FBMeetToken',
    Chat: {}
};

FBMeet.Loader = {

    load: function(e) {
        FBMeet.Observer.ChatTabs.observe();
        FBMeet.Observer.ContactsList.observe();
        this.retrieveToken();
        chrome.runtime.onMessage.addListener(this.messageListener);
    },

    messageListener: function(data, sender, callback) {
        if (data.request == 'setToken') {
            console.log('FBMeet: [CS] Received "setToken" message from BS');
            if (data.token) {
                console.log('FBMeet: [CS] It had a valid token, gonna test it');
                FBMeet.token = data.token;
                FBMeet.Loader.testToken();
            } else { 
                console.log('FBMeet: [CS] It gave me a non valid token(' + data.token + '), getting a new one');
                FBMeet.Loader.newToken();
            }
        }
    },

    testToken: function() {
        console.log('FBMeet: [CS] Testing token')
        FB.get('/me').done(function(response, status, xhr) {
            console.log('FBMeet: [CS] Token ok')
        }).fail(function(xhr, status, error) {
            if (xhr.status === 400) {
                var response = null;
                try {
                    response = $.parseJSON(xhr.responseText);
                    if (response.error.type === 'OAuthException') {
                        console.log('FBMeet: [CS] Token had problems, getting a new one');
                        FBMeet.Loader.newToken();
                    } else { response = null; }
                } catch(e) { 
                    console.log('Got error parsing response, ' + e);
                    response = null;
                }
                if (response === null) {
                    console.log('FBMeet: [CS] FBMeet: 400 response, but not OAuthException, please check.');
                }
            } else {
                console.log('FBMeet: [CS] FBMeet: Request failed but not 400, please check.');
            }
        });
    },

    newToken: function() {
        chrome.runtime.sendMessage({
            request: 'newToken'
        });
        console.log('FBMeet: [CS] Sent "newToken" message to BS');
    },

    retrieveToken: function() {
        chrome.runtime.sendMessage({
            request: 'getToken'
        });        
        console.log('FBMeet: [CS] Sent "getToken" message to BS');
    }
    
};

$(document).ready(function(e) {
    FBMeet.Loader.load(e);
});
