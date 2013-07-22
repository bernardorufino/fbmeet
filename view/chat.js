/**
* Represents a chat window in the layout and its modifications.
*/
FBMeet.Chat.Window = createClass({ 

    instances: 0,

    build: function($chatWindow) {
        this.instances += 1;
        return new this($chatWindow);
    }

}, { // Class properties above, instance properties below 

    when: 'soon',
    $btn: null,
    $wrap: null,
    $slide: null,
    $friendSlide: null,
    $chatWindow: null,
    $today: null,
    $tomorrow: null,
    $soon: null,
    $text: null,
    $loc: null,
    $locBtn: null,
    $friendsBtn: null,
    $okFriends: null,
    $cancelFriends: null,
    $dropbag: null,
    dropbag: null,
    $ok: null,
    $done: null,
    $chatBody: null,
    toggleEnabled: true,
    event: null,

    initialize: function($chatWindow) {
    	this.$chatWindow = $chatWindow;
    	this.createElements();
    	this.findElements();
    	this.appendElements();
        this.setListeners();
    },

    appendElements: function() { 
    	this.$chatWindow.find('._1sk5') // WTF? 
    		.append(this.$slide)
    		.append(this.$friendSlide);
    	this.$wrap.append(this.$btn);
    	this.$chatWindow.find('.mls').prepend(this.$wrap);
    },

    createElements: function() {
    	this.$btn = $(FBMeet.Chat.Templates.triggerBtn);
    	this.$slide = $(FBMeet.Chat.Templates.slide);
    	this.$friendSlide = $(FBMeet.Chat.Templates.friendSlide);
    	this.$wrap = $(FBMeet.Chat.Templates.wrap);
    },

    findElements: function() {
    	this.$today = this.$slide.find('.meet-today');
    	this.$tomorrow = this.$slide.find('.meet-tomorrow');
    	this.$soon = this.$slide.find('.meet-soon');
    	this.$text = this.$slide.find('.meet-text');
    	this.$loc = this.$slide.find('.meet-loc');
    	this.$locBtn = this.$slide.find('.meet-loc-btn');
    	this.$friendsBtn = this.$slide.find('.meet-friends-btn');
    	this.$dropbag = this.$friendSlide.find('.meet-dropbag');
    	this.dropbag = this.$dropbag[0];
    	this.$ok = this.$slide.find('.meet-ok');
    	this.$done = this.$slide.find('.meet-done');
        this.$input = this.$chatWindow.find('textarea.uiTextareaAutogrow');
        this.$chatBody = this.$chatWindow.find('.fbNubFlyoutBody');
    },

    //TODO: Instead of curry, use data argument for events, from jQuery
    setListeners: function() {
        this.$today.click(this.whenButtonListener.curry(this, 'today'));
        this.$tomorrow.click(this.whenButtonListener.curry(this, 'tomorrow'));
        this.$soon.click(this.whenButtonListener.curry(this, 'soon'));
        this.$locBtn.click(this.buttonLocationClick.curry(this));
        this.$friendsBtn.click(this.buttonFriendsClick.curry(this));
        this.$ok.click(this.buttonOkClick.curry(this));
        this.$done.click(this.buttonDoneClick.curry(this));
        this.$input.keyup(this.registerChatInput.curry(this));
        this.$btn.bind('click.fbmeet', this.buttonClick.curry(this));
        var dropbag = this.$dropbag[0];
        dropbag.addEventListener('drop', this.dropbagDrop.curry(this), false);
        dropbag.addEventListener('dragenter', this.dropbagDragEnter.curry(this), false);
        dropbag.addEventListener('dragover', this.dropbagDragOver.curry(this), false);
        dropbag.addEventListener('dragleave', this.dropbagDragLeave.curry(this), false);
    },

    dateString: function() {
    	var date = new Date();
    	if (this.when == 'tomorrow') 
    		date.setDate(date.getDate() + 1);
    	var dd = date.getDate();
    	var mm = date.getMonth() + 1; // January is 0!
    	var yyyy = date.getFullYear();
    	dd = (dd < 10) ? '0' + dd : dd; // Will coerce after
    	mm = (mm < 10) ? '0' + mm : mm; // Will coerce after
        return yyyy + '-' + mm + '-' + dd;
    },

    eventCreatedCallback: function(event) {
        this.event = event;
        this.updateEventInfo(event);
        this.toggleEnabled = false;
        this.$btn.removeClass("loading");
        this.$btn.addClass("finished");
        this.$slide.find('.meet-create').hide(200);
        this.$slide.find('.meet-invite').show(200);    
        this.animateWindow(function(chat) {
            chat.$slide.animate({height: '27px'}, 250);            
        });
        this.$chatWindow.find('textarea.uiTextareaAutogrow').val(event.url);
    },

    getEventCreatedCallback: function() {
        return this.eventCreatedCallback.bind(this);
    },

    updateEventInfo: function(event) {
        $('.meet-event-info .name').text(event.name).attr('href', event.url);
        $('.meet-event-info .start_time').text(event.prettyDate());
        if (event.location) {
            $('.meet-event-info .location').text(event.location);
            $('.meet-event-info .location-wrapper').show();
        } else {
            $('.meet-event-info .location-wrapper').hide();
        }
        for (var i = 0; i < event.invited.length; i++) {
            this.addPictureToDropBag(event.invited[i]);
        }
    },

    startLoading: function() {
        this.$dropbag.addClass('meet-loading');
    },

    finishLoading: function() {
        this.$dropbag.removeClass('meet-loading');
    },

    addPictureToDropBag: function(invitee) {
        if (!this.$dropbag.data('users')) this.$dropbag.data('users', {});
        var users = this.$dropbag.data('users');
        if (users[invitee.id]) return null;
        var $pic = $('<img/>', {
            class: 'pic img',
            src: invitee.picture,
            draggable: false
        }).appendTo(this.$dropbag);
        users[invitee.id] = $pic;
        return $pic;
    },

    animateWindow: function(doAnimate) {
        // Store old values
        var oldHeight = 0;
        if (this.$slide.is(':visible')) oldHeight += this.$slide.height();
        if (this.$friendSlide.is(':visible')) oldHeight += this.$friendSlide.height();
        // TODO: This is excessively inefficient and hacky, more elegance, please!
        // Simulating Thread.join with closures and queues
        var ready = false;
        var bodyHeight = this.$chatBody.height();
        var interval = 30;
        var timer = setInterval(this.adjustWindow.curry(this, oldHeight, bodyHeight), interval);
        // Make animation
        doAnimate(this);
        var join = function(next) {
            if (ready) setTimeout(clearInterval.curry(timer), interval);
            else ready = true;
            next();
        };
        this.$slide.queue(join);
        this.$friendSlide.queue(join);
    },

    adjustWindow: function(chat, delta, oldChatBodyHeight) {
        // Calculate new values
        if (chat.$slide.is(':visible')) delta -= chat.$slide.height();
        if (chat.$friendSlide.is(':visible')) delta -= chat.$friendSlide.height();
        // Update the chatBody to handle the difference
        chat.$chatBody.css('height', oldChatBodyHeight + delta);

    },

    whenButtonListener: function(chat, when) {
    	chat.when = when;
    	chat.$today.toggleClass('uiButtonOverlay', when != 'today').toggleClass('uiButtonDepressed', when == 'today');
    	chat.$tomorrow.toggleClass('uiButtonOverlay', when != 'tomorrow').toggleClass('uiButtonDepressed', when == 'tomorrow');
    	chat.$soon.toggleClass('uiButtonOverlay', when != 'soon').toggleClass('uiButtonDepressed', when == 'soon');
    }

}).includes(FBMeet.Chat.Listener);