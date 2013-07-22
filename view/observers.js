FBMeet.Observer = {

	ContactsList: {

		count: 0,

		observe: function() {
			// Fixed contacts that appear in the list
			var $fixeds = $('.fbChatSidebarBody .fbChatOrderedList');
			var fixedContactsListener = this.onFixedContactsChange.curry($fixeds);
			new WebKitMutationObserver(fixedContactsListener).observe($fixeds[0], {childList: true});
			// Contacts from the search
			var $search = $('.fbChatSidebarBody .fbChatTypeaheadView');
			var searchContactsListener = this.onSearchContactsChange.curry($search);
			new WebKitMutationObserver(searchContactsListener).observe($search[0], {childList: true});			
		},

		onFixedContactsChange: function($contacts) {
			var self = FBMeet.Observer.ContactsList;
			$contacts.find('li img.pic').each(self.makeDraggable.curry(self));
		},

		onSearchContactsChange: function($contacts) {
			var self = FBMeet.Observer.ContactsList;
			$contacts.find('li img').each(self.makeDraggable.curry(self));
		},

		// Picture is on 'this', as HTML element, not jQuery
		// self contains FBMeet.Observer.ContatcsList
		makeDraggable: function(self) {
			var $this = $(this);
			if (!$this.attr('draggable')) {
				$this.attr({id: 'meet-draggable-' + self.count++, draggable: true});
				this.addEventListener('dragstart', self.picDragStart.curry(self), false);
				this.addEventListener('drag', self.picDrag.curry(self), false);
				var messageUrl = $this.parents('a:eq(0)').attr('href');
				var userId = FB.extractUserId(messageUrl);
				$this.data('userId', userId);
				//$this.css('border', '2px solid #00F'); // Debug purposes
			}

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
		}

	},

	ChatTabs: {

		observe: function() {
			var $tabs = $('#ChatTabsPagelet .fbNubGroup.clearfix.videoCallEnabled');
	        // No chat for us to modify =(
	        if ($tabs.length == 0) return;
	        // For chat windows that are already there when the page loads
	        $tabs.children().each(function(i, item) {
	            FBMeet.Chat.Window.build($(item));
	        });
	        // For chat windows that are created by the user afterwards
	        var observer = new WebKitMutationObserver(this.onChange.curry($tabs));
	        observer.observe($tabs[0], {childList: true});
		},

		onChange: function($tabs) {
			var counter = $tabs.children().length;
            var instances = FBMeet.Chat.Window.instances;
            if (counter > instances) {
                FBMeet.Chat.Window.build($tabs.children(':first'));
            } else if (counter < instances) {
                FBMeet.Chat.Window.instances = counter;
            }
		} 

	}



};