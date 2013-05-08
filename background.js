var successURL = 'www.facebook.com/connect/login_success.html';

function onFacebookLogin(){
  if (!localStorage.getItem('accessToken')) {
    chrome.tabs.query({}, function(tabs) { // get all tabs from every window
      for (var i = 0; i < tabs.length; i++) {
        // alert("url:" + tabs[i].url + "  .  successURL: " + successURL + " indexOf: " + tabs[i].url.indexOf(successURL));
        if (tabs[i].url.indexOf(successURL) !== -1) {
          // below you get string like this: access_token=...&expires_in=...
          var params = tabs[i].url.split('#')[1];

          // in my extension I have used mootools method: parseQueryString. The following code is just an example ;)
          var accessToken = params.split('&')[0];
          accessToken = accessToken.split('=')[1];

          localStorage.setItem('accessToken', accessToken);
          chrome.tabs.remove(tabs[i].id, function() {
            alert("tab is supposed to be closed.");
          });
        }
      }
    });
  }
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);