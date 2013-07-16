/**
* Sample extension of class FBMeet.Event.Chat.Window, all methods here
* are gonna be included there (as instance methods). Just for organization.
*/
FBMeet.Chat.Listener = {

	buttonClick: function(chat, e) {
		e.stopPropagation();
		if (!chat.toggleEnabled) return;
		chat.animateWindow(function(chat) {
			if (chat.event) {
				chat.$friendSlide.slideToggle(200);
			} else {
				chat.$slide.slideToggle(200);
			}
		});
	},

	buttonLocationClick: function(chat, e) {
		chat.animateWindow(function(chat) {
			chat.$slide.animate({height: '114px'}, 250);
			chat.$loc.show(300);
			chat.$locBtn.hide(200);
		});
	},

	picDragStart: function(chat, e) {
		// Hides annoying layer that stays on top of drop area
		$('.uiContextualLayerLeft').remove();
		var $pic = $(e.target);
		e.dataTransfer.setData('id', $pic.attr('id'));
	},

	picDrag: function(chat, e) {
		// Hides annoying layer that stays on top of drop area
		$('.uiContextualLayerLeft').remove();
	},

	dropbagDragEnter: function(chat, e) {
		e.stopPropagation();
		e.preventDefault();
	},

	dropbagDragOver: function(chat, e) {
		e.stopPropagation();
		e.preventDefault();
	},	

	dropbagDrop: function(chat, e) {
		e.stopPropagation();
		e.preventDefault();
		var id = e.dataTransfer.getData('id');
		var $source = $('#' + id);
		var $target = $(e.target);
		chat.dropUser(chat, $source, $target);
	},

	dropUser: function(chat, $source, $target) {
		if (!$target.data('users')) $target.data('users', {});
		var users = $target.data('users');
		var inviteeId = $source.data('userId');
		// If already exists, blinks the existent and dismiss the drop
		if (users[inviteeId]) {
			// TODO: Check current event already invited!
			users[inviteeId].fadeOut(100).fadeIn(400);
			return;
		}
		// Show drop dismiss info
		$('.meet-drop-dismiss').show(800);
		// Clone picture to insert in drop area
		var $pic = $source.clone();
		// Clone attached data
		$pic.data($source.data());
		$pic.click(chat.removeUser.curry(chat, $target, inviteeId));
		chat.startLoading();
		chat.event.invite(inviteeId, function(event, success) {
			chat.finishLoading();
			if (success) {
				$target.append($pic);
				users[inviteeId] = $pic;
				console.log('FBMeet: User ' + inviteeId + ' invited.');
			} else {
				console.log('FBMeet: Error inviting user ' + inviteeId + ', please check.')
			}
		});		
	},

	removeUser: function(chat, $bag, inviteeId) {
		var users = $bag.data('users');
		var $pic = users[inviteeId];
		chat.startLoading();
		chat.event.uninvite(inviteeId, function(event, success) {
			chat.finishLoading();
			if (success) {
				$pic.fadeOut(300).promise().done(function() {$pic.remove();});
				delete users[inviteeId];
				// Hide drop dismiss info if there's no more users to dismiss
				if (Object.size(users) == 0) $('.meet-drop-dismiss').hide(800);
				console.log('FBMeet: User ' + inviteeId + ' uninvited.');
			} else {
				console.log('FBMeet: Error uninviting user' + inviteeId + ', please check.');
			}

		});
	},

	prepareDragDrop: function(chat) {
		$('.uiScrollableAreaBody li').each(function(index, item) {
			var $pic = $(item).find('.pic.img');
			if ($pic && $pic.length > 0) {
		        $pic.attr({id: 'meet-draggable-' + index, draggable: true});
		        $pic[0].addEventListener("dragstart", chat.picDragStart.curry(chat), false);
		        $pic[0].addEventListener("drag", chat.picDrag.curry(chat), false);
		        // Gotta do it now, otherwise FB blocks me from getting the ID latter
				var messageUrl = $pic.parents('a:eq(0)').attr('href');
				var userId = FB.extractUserId(messageUrl);
		        $pic.data('userId', userId);
			}
		});
	},

	buttonFriendsClick: function(chat, e) {
		chat.prepareDragDrop(chat);
		chat.toggleEnabled = true;
		chat.animateWindow(function(chat) {
			chat.$slide.slideUp(200);
			chat.$friendSlide.slideDown(270);
		});
	},

	buttonDoneClick: function(chat, e) {
		chat.prepareDragDrop(chat);
		chat.toggleEnabled = true;
		chat.animateWindow(function(chat) {
			chat.$slide.slideUp(200);
			chat.$friendSlide.slideUp(270);
		});
	},

	updateSlideToLoading: function() {
		this.$ok.css({
    		'cursor': 'default'
    	}).unbind('click')

    	this.$ok.children().css({
    		'color': '#BBB',
    		'cursor': 'default'
    	}).unbind('click');

    	this.$btn.addClass('loading');
	},

	buttonOkClick: function(chat, e) {
		e.preventDefault();
		chat.updateSlideToLoading(); // chat
		var inviteeUrl = chat.$chatWindow.find('h4 a').attr('href');
		var inviteeId = FB.extractUserId(inviteeUrl);
		var attributes = {
			"name": chat.$text.val(),
			"location": chat.$loc.val(),
			"date": chat.dateString(),
			"description": chat.$text.val(),
			"invitee": inviteeId
		};
		var event = FBMeet.Event.create(attributes, chat.getEventCreatedCallback());
	},

	doNothing: function(chat, e) {
		e.stopPropagation();
	},

	//TODO: Implement
	registerChatInput: function(chat, e) {
		//console.log("implement registerChatInput!")
	}

};