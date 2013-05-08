FBMeet.Event.Chat.Listener = {

	// All methods here are included in FBMeet.Event.Chat.Window object

	buttonClick: function(chat, e) {
		e.stopPropagation();
		chat.$slide.slideToggle(200);
	},

	buttonLocationClick: function(chat, e) {
		chat.$slide.animate({height: '114px'}, 250);
		chat.$loc.show(300);
		chat.$locBtn.hide(200);	
	},

	dropbagDrop: function(chat, e) {
		e.stopPropagation();
		var id = e.dataTransfer.getData('id');
		var $target = $(e.target);
		var $source = $('#' + data);
		var $pic = $source.clone().attr({
			'width': 28,
			'height': 28
		}).css({
			'margin-top': '3px',
			'padding-right': '3px'
		});
		// Transfer name to recently cloned
		$pic.data($source.data());
		$target.append($pic);
	},

	dropbagDragOver: function(chat, e) {
		e.stopPropagation();
	},	

	picDragStart: function(chat, e) {
		$pic = $(e.target);
		e.dataTransfer.setData('id', $pic.attr('id'));
		var name = $pic.parent().parent().parent().find('div')[4].innerHTML
		$pic.data('name', name);
	},

	buttonFriendsClick: function(chat, e) {
		chat.$slide.slideUp(200);
		chat.$friendSlide.slideDown(270);
		$('.uiScrollableAreaBody li').each(function(index, item) {
			var $pic = $(item).find('.pic.img');
			if ($pic && $pic.length > 0) {
		        $pic.attr({id: 'meet-draggable-' + index, draggable: true});
		        $pic[0].addEventListener("dragstart", chat.picDragStart.curry(chat), false);
			}
		});
	},

	buttonOkFriendsClick: function(chat, e) {
		e.preventDefault();
		var names = chat.$dropbag.children().map(function(index, item) {
			return $(item).data('name');
		});
		console.log("FBMeet.Event.invite(" + names + ")");
		chat.$friendSlide.slideUp(200);
	},

	buttonCancelFriendsClick: function(chat, e) {
		chat.$dropbag.html("");
		chat.$friendSlide.slideUp(200);
		chat.$slide.slideDown(270);		
	},

	buttonOkClick: function(chat, e) {
		e.preventDefault();
		chat.disableOkButton(); // chat
		var inviteeName = chat.$chatWindow.find('h4 a').html();
		var params = {
			"name": chat.$text.val(),
			"location": chat.$loc.val(),
			"date": chat.dateString(),
			"time": "82800", // 23:00 default
			"description": chat.$text.val(),
			"invitee": inviteeName
		});
		console.log("FBMeet.Event.add(" + params + ")");
	},

	buttonDoneClick: function(chat, e) {
    	$slide.slideUp(200);
	},

	//TODO: Implement
	registerChatInput: function(chat, e) {
		console.log("implement registerChatInput!")
	}

};