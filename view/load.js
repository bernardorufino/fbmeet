$(document).ready(function(e) {

	var $tabs = $('#ChatTabsPagelet .fbNubGroup.clearfix.videoCallEnabled');
	var length = $tabs.children().length;
		
	$tabs.children().each(function(i, item) {
		ChatWindow.build($(item));
	});

	var observer = new WebKitMutationObserver(function() {
		var counter = $tabs.children().length;
		var instances = FBMeet.Chat.Window.instances;
		if (counter > instances)
			ChatWindow.build($tabs.children(':first'));
	});

	observer.observe($tabs[0], {'childList': true});
});