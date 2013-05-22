// Initializes FBMeet and FBMeet.Chat to use as a namespace
FBMeet = {
    Chat: {}
};


FBMeet.Loader = {

    load: function(e) {
        this.loadAPI();
        this.observeChat();
    },

    // Not being called by FB API (see l.65)
    initAPI: function() {
        FB.init({
            appId: '315621838568609',
            //channelUrl: '',
            status: true,
            cookie: true,
            xfbml: true
        });
    },

    loadAPI: function(e) {
        var id = 'facebook-jssdk';
        if ($('#' + id).length > 0) return;
        $('<script />', {
            id: id,
            async: true,
            src: '//connect.facebook.net/en_US/all.js' 
        }).appendTo($('head'));
        $('<fb-root />').appendTo($('body'));
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

window.fbAsyncInit = FBMeet.initAPI;
