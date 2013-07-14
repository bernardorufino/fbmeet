// Since authorizer.js is a background script, FBMeet does not override FBMeet that
// exists in content script (init.js)
FBMeet = {};

/**
* Authentication ...
*/
FBMeet.Auth = {

    appId: '315621838568609',
    appSecret: '3cca115555739db04a88fc0c92ada0b0',
    permissions: 'create_event,rsvp_event,user_events,friends_events',
    redirectUri: 'https://www.facebook.com/connect/login_success.html',
    // Internal
    localStorageTokenKey: 'FBMeetToken',
       

    load: function() {
        var key = this.localStorageTokenKey;
        if (!this.hasToken()) this.retrieveToken();
        // Returns the access token to the content script
        chrome.runtime.onMessage.addListener(this.messageListener);
    },

    messageListener: function(data, sender, callback) {
        var key = FBMeet.Auth.localStorageTokenKey;
        var token = localStorage[key];
        if (data.request === 'getToken') {
            console.log('BS: received "getToken" message from CS, returning token = ' + token);
            FBMeet.Auth.sendTokenToContentScript();
        } else if (data.request === 'newToken') {
            console.log('BS: received "newToken" message from CS, getting new one');
            FBMeet.Auth.retrieveToken();
        }
    },

    sendTokenToContentScript: function() {
        console.log('BS: Sending token to CS');
        var key = FBMeet.Auth.localStorageTokenKey;
        var token = localStorage[key];
        console.log('BS: token = ' + token);
        chrome.tabs.query({
            url: '*://www.facebook.com/*'
        }, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, {
                    request: 'setToken',
                    token: token
                });
            }
        });
    },

    hasToken: function() { return !!localStorage[this.localStorageTokenKey]; },

    retrieveToken: function() {
        console.log('BS: Retrieving new token');
        var key = FBMeet.Auth.localStorageTokenKey;
        chrome.tabs.onUpdated.addListener(this.updatedTabListener);
        delete localStorage[key];
        this.openAuthTab();
    },

    openAuthTab: function() {
        console.log('BS: Opening new tab')
        // In order to place the new tab next to the current
        var self = this;
        chrome.tabs.getSelected(null, function(tab) {
            chrome.tabs.create({
                index: tab.index,
                url: 'https://www.facebook.com/dialog/oauth?'
                     + 'client_id=' +  self.appId 
                     + '&response_type=' + 'token'
                     + '&scope=' + self.permissions
                     + '&redirect_uri=' + self.redirectUri
            });
        });
    },

    updatedTabListener: function(tabId, changeInfo, tab) {
        var key = FBMeet.Auth.localStorageTokenKey;
        if (!localStorage[key]) {
            if (tab.url.startsWith(FBMeet.Auth.redirectUri)) {
                console.log('BS: New useful tab detected, proceding to gather token');
                var token = purl(tab.url).fparam('access_token');
                if (token) {
                    console.log('BS: Got valid token, sending it to CS');
                    localStorage[key] = token;
                    FBMeet.Auth.sendTokenToContentScript();
                } else {
                    console.log('BS: Got INvalid token, token = ' + token);
                }
                chrome.tabs.onUpdated.removeListener(FBMeet.Auth.updatedTabListener);
                chrome.tabs.remove(tabId);
            }
        }
    }

}


FBMeet.Auth.load();

