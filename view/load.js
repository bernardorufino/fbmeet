$(document).ready(function(e) {

	var $tabs = $('#ChatTabsPagelet .fbNubGroup.clearfix.videoCallEnabled');
	var length = $tabs.children().length;
		
	$tabs.children().each(function(i, item) {
		var chatWindow = new ChatWindow($(item));
	});
	//TODO:!
});