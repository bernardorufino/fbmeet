// CS2

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var people = request.invitePeople;

    //Da pagina de eventos, clicar em invite people
    $("a:contains('Invite Friends').fbEventInviteButton")[0].click();

    var interval = setInterval(function(){
      var input = $(".fbProfileBrowserListContainer .fwb");
      if (input.length > 0) {
        clearInterval(interval);

        for (var i = 0; i < people.length; i++) {
          var name = people[i];
          $("div:contains('" + name + "').fwb").click();
        }
        
        //Click ok button;
        $("button[type='submit']:contains('Save')")[0].click();

          var address = window.location.href;
          var interval3 = setInterval(function(){
          
          if (window.location.href != address) {
            clearInterval(interval3);
            chrome.runtime.sendMessage({invitePeopleRemove: true}, function() { return true; });
          }

        }, 500);

      }
    }, 500);
  }
);
