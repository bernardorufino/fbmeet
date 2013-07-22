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
    redirectUriLongLive: 'http://bernardorufino.github.io/fbmeet',
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
            console.log('FBMeet: [BS] received "getToken" message from CS, returning token = ' + token);
            FBMeet.Auth.sendTokenToContentScript();
        } else if (data.request === 'newToken') {
            console.log('FBMeet: [BS] received "newToken" message from CS, getting new one');
            FBMeet.Auth.retrieveToken();
        }
    },

    sendTokenToContentScript: function() {
        console.log('FBMeet: [BS] Sending token to CS');
        var key = FBMeet.Auth.localStorageTokenKey;
        var token = localStorage[key];
        console.log('FBMeet: [BS] token = ' + token);
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

    hasToken: function() { return !!localStorage[FBMeet.Auth.localStorageTokenKey]; },

    retrieveToken: function() {
        console.log('FBMeet: [BS] Retrieving new token');
        var key = FBMeet.Auth.localStorageTokenKey;
        chrome.tabs.onUpdated.addListener(this.updatedTabListener);
        delete localStorage[key];
        this.openAuthTab();
    },

    openAuthTab: function() {
        console.log('FBMeet: [BS] Opening new tab')
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
            }, function(otherTab) {
                /* ... */
            });
        });
    },

    retrieveLongLivedToken: function() {
        console.log('FBMeet: [BS] Opening long live token tab');
        var self = this;
        var key = FBMeet.Auth.localStorageTokenKey;
        // In order not to call with token
        var token = FBMeet.token
        FBMeet.token = null;
        FB.get('/oauth/access_token', {
            'client_id': self.appId,
            'client_secret': self.appSecret,
            'grant_type': 'fb_exchange_token',
            'fb_exchange_token': token
        }).done(function(response, status, xhr) {
            console.log('FBMeet: [BS] Got valid long live token, sending to CS');
            var url = purl('?' + response);
            var token = url.param('access_token');
            var expires = url.param('expires');
            console.log('FBMeet: [BS] This one expires in ' + expires + 's');
            self.setToken(token);
            self.sendTokenToContentScript();
        }).fail(function(xhr, status, error) {
            console.log('FBMeet: [BS] Couldn\'t get long lived token, sending short one to CS');
            self.setToken(token);
            self.sendTokenToContentScript();
        });
    },

    setToken: function(token) {
        var key = FBMeet.Auth.localStorageTokenKey;
        FBMeet.token = token;
        localStorage[key] = token;
    },

    updatedTabListener: function(tabId, changeInfo, tab) {
        var self = FBMeet.Auth;
        if (tab.url.startsWith(FBMeet.Auth.redirectUri)) {
            if (!self.hasToken()) {
                console.log('FBMeet: [BS] New useful tab detected, proceding to gather token');
                var token = purl(tab.url).fparam('access_token');
                if (token) {
                    console.log('FBMeet: [BS] Got valid token, getting long-live token');
                    self.setToken(token);
                    FBMeet.Auth.retrieveLongLivedToken();
                } else {
                    console.log('FBMeet: [BS] Got INvalid token, token = ' + token);
                }
                chrome.tabs.onUpdated.removeListener(FBMeet.Auth.updatedTabListener);
            }
            chrome.tabs.remove(tabId);
        }
    }

}


FBMeet.Auth.load();

