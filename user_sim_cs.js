// CS2

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var eventParameters = request.addEvent;
    //Da pagina de eventos, clicar em criar evento
    $("span:contains('Create Event').uiButtonText").click();
    var interval = setInterval(function(){
      var input = $("input.inputtext.eventTitle");
      if (input.length > 0) {
        clearInterval(interval);
        input.val(eventParameters.name);    //Change the details
        
        $("td.prs a:contains('Invite Friends')")[0].click();

        var interval2 = setInterval(function(){

          var placeholder = $(".fbProfileBrowserListContainer input");
          if (placeholder.length > 0) {
            clearInterval(interval2);

            // Select invitee
            $("div:contains('" + eventParameters.invitee + "').fwb").click();

            // Click selection
            $("button:contains('Save')._42ft").click();

            // Description
            $("textarea.uiTextareaNoResize.eventDetails").focus().val(eventParameters.description);
            
            //Change the location
            $("input.inputtext.textInput[name='location']").focus().val(eventParameters.location);
            
            //Change due date
            $("input[name='when_date']").val(eventParameters.date);
            
            //Change due time
            $("input[name='when_time']").focus().val(eventParameters.time);
            
            //Click ok button;
            $("button._42ft._42fu.layerConfirm.uiOverlayButton._42g-").click();

            var address = window.location.href;
            var interval3 = setInterval(function(){
              
              if (window.location.href != address) {
                clearInterval(interval3);

                chrome.runtime.sendMessage({removeTab: true, eventLink: window.location.href}, function() { return true; });

                
              }

            }, 500);

          }

        }, 500);


      }
    }, 500);



    sendResponse(true);
  }
);
