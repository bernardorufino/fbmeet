
source = null;
id = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if (request.addEvent) {
      source = sender;
      id = request.id;
      // please, don't read the code below =(    
  		chrome.tabs.create({url: "http://www.facebook.com/events/list/", active: false}, function(tab){
        var interval = setInterval(function(){
          chrome.tabs.get(tab.id, function(tab){
            if (tab.status == "complete") {
              clearInterval(interval);          
              chrome.tabs.sendMessage(tab.id, request, sendResponse);    
            }
          });
        }, 500);
  		})
  	} else if (request.removeTab) {
      chrome.tabs.remove(sender.tab.id);
      chrome.tabs.sendMessage(source.tab.id, {response: true, id: id, eventLink: request.eventLink}, function(){ return true; });
    } else if (request.invitePeople) {
      source = sender;
      chrome.tabs.create({url: request.eventLink, active: false}, function(tab){
        var interval = setInterval(function(){
          chrome.tabs.get(tab.id, function(tab){
            if (tab.status == "complete") {
              clearInterval(interval);          
              chrome.tabs.sendMessage(tab.id, request, sendResponse);    
            }
          });
        }, 500);
      })
    } else if (request.invitePeopleRemove) {
      chrome.tabs.remove(sender.tabs.id);

    }
    return true;
});