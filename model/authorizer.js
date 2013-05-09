FBMeetAuth = {
    var successURL = 'www.facebook.com/connect/login_success.html';
    var tokenAvailable = false;

    successfulLoginDetecter: function(tabId, changeInfo, tab) {
        if (!tokenAvailable) {
            if (tab.url.indexOf(successURL) != -1){
                
            }
        }
    }

    getPermissions: function() {
        chrome.tabs.onUpdated.addListener(function(integer tabId, object changeInfo, Tab tab) {...});
        openLoginPopup('https://www.facebook.com/dialog/oauth?' + 
            'client_id=315621838568609&response_type=token&scope=email&' +
            'redirect_uri=http://www.facebook.com/connect/login_success.html');
        chrome.tabs.onUpdated.addListener(successfulLoginDetecter);
    }

    openLoginPopup: function(url){
        newwindow=window.open(url);
        if (window.focus) {newwindow.focus()}
        return false;
    }

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            //TODO: remove the log after debugging
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
                if (request.request_type == "request_token"){
                    sendResponse({debug: "request_token received in authorizer.js"});

                }
    });
}