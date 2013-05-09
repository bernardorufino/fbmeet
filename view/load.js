$(document).ready(function(e) {

	var $tabs = $('#ChatTabsPagelet .fbNubGroup.clearfix.videoCallEnabled');
			
	$tabs.children().each(function(i, item) {
		FBMeet.Chat.Window.build($(item));
	});

	var observer = new WebKitMutationObserver(function() {
		var counter = $tabs.children().length;
		var instances = FBMeet.Chat.Window.instances;
		if (counter > instances)
			FBMeet.Chat.Window.build($tabs.children(':first'));
	});

	observer.observe($tabs[0], {'childList': true});
});
