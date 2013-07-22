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

	dropbagDragEnter: function(chat, e) {
		chat.$dropbag.addClass('dragover');
		e.stopPropagation();
		e.preventDefault();
	},

	dropbagDragLeave: function(chat, e) {
		chat.$dropbag.removeClass('dragover');
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
		chat.$dropbag.removeClass('dragover');
		var id = e.dataTransfer.getData('id');
		var $source = $('#' + id);
		chat.dropUser(chat, $source, chat.$dropbag);
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
		$pic.addClass('meet-removable');
		// Clone attached data
		$pic.data($source.data());
		$pic.click(chat.removeUser.curry(chat, $target, inviteeId));
		chat.startLoading();
		chat.event.invite(inviteeId, function(event, success) {
			chat.finishLoading();
			if (success) {
				$target.append($pic);
				users[inviteeId] = $pic;
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
				// 2 initial ones, the owner and the person with whom the owner is chatting
				if (Object.size(users) == 2) $('.meet-drop-dismiss').hide(800);
				console.log('FBMeet: User ' + inviteeId + ' uninvited.');
			} else {
				console.log('FBMeet: Error uninviting user' + inviteeId + ', please check.');
			}

		});
	},

	buttonFriendsClick: function(chat, e) {
		chat.toggleEnabled = true;
		chat.animateWindow(function(chat) {
			chat.$slide.slideUp(200);
			chat.$friendSlide.slideDown(270);
		});
	},

	buttonDoneClick: function(chat, e) {
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