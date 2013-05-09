// Represents a chat window
FBMeet.Chat.Window = createClass({ 

    instances: 0,

    build: function($chatWindow) {
        this.instances += 1;
        return new this($chatWindow);
    }

}, {// Class properties above, instance properties below 

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

    initialize: function($chatWindow) {
    	this.$chatWindow = $chatWindow;
    	this.createElements();
    	this.findElements();
    	this.appendElements();
      this.setListeners();
    },

    appendElements: function() { 
    	this.$chatWindow.find('._1sk5') 
    		.append(this.$slide)
    		.append(this.$friendSlide); // The hell is that?
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
    	this.$okFriends = this.$slide.find('.meet-ok');
    	this.$cancelFriends = this.$slide.find('.meet-cancel');
    	this.$dropbag = this.$slide.find('.meet-dropbag');
    	this.dropbag = this.$dropbag[0];
    	this.$ok = this.$slide.find('.meet-ok');
    	this.$done = this.$slide.find('.meet-done');
        this.$input = this.$chatWindow.find('textarea.uiTextareaAutogrow');
    },

    //TODO: Instead of curry, use data argument for events, from jQuery
    setListeners: function() {
        this.$today.click(this.whenButtonListener.curry(this, 'today'));
        this.$tomorrow.click(this.whenButtonListener.curry(this, 'tomorrow'));
        this.$soon.click(this.whenButtonListener.curry(this, 'soon'));
        this.$locBtn.click(this.buttonLocationClick.curry(this));
        this.$friendsBtn.click(this.buttonFriendsClick.curry(this));
        this.$cancelFriends.click(this.buttonCancelFriendsClick.curry(this));
        this.$ok.click(this.buttonOkClick.curry(this));
        this.$done.click(this.buttonDoneClick.curry(this));
        this.$btn.bind('click.fbmeet', this.buttonClick.curry(this));
        this.$input.keyup(this.registerChatInput.curry(this));
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
    	return mm + '/' + dd + '/' + yyyy;
    },

    disableOkButton: function() {
    	this.$ok.css({
    		'cursor': 'default'
    	}).unbind('click')

    	this.$ok.children().css({
    		'color': '#BBB',
    		'cursor': 'default'
    	}).unbind('click');

    	this.$btn.css('background-image', 'url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yk/r/LOOn0JtHNzb.gif")');
    },

    eventCallback: function() {
        this.$btn.addClass("finished");
        this.$btn.unbind('click.fbmeet');
        this.$btn.bind('click.fbmeet', this.doNothing.curry(this));
        //...
        //TODO: Finish this implementation
        // find a way to group jquery elements together
    },

    whenButtonListener: function(chat, when) {
    	chat.when = when;
    	chat.$today.toggleClass('uiButtonOverlay', when != 'today').toggleClass('uiButtonDepressed', when == 'today');
    	chat.$tomorrow.toggleClass('uiButtonOverlay', when != 'tomorrow').toggleClass('uiButtonDepressed', when == 'tomorrow');
    	chat.$soon.toggleClass('uiButtonOverlay', when != 'soon').toggleClass('uiButtonDepressed', when == 'soon');
    }

}).includes(FBMeet.Chat.Listener);