$(document).ready(function(e) {
	var $tabs = $('#ChatTabsPagelet .fbNubGroup.clearfix.videoCallEnabled');
	
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
    }
    else if(counter < instances){
      FBMeet.Chat.Window.instances = counter;
    }
	});

	observer.observe($tabs[0], {'childList': true});
});