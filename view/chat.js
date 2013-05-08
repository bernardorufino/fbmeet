//Represent a chat window
FBMeet.Chat.Window = prototype({ 
    // Class properties (aka static in Java)
    instances: 0,

    build: function($chatWindow) {
        this.instances += 1;
        return new this($chatWindow);
    }

}, { 
    // Instace properties

    // Fields
    when: 'soon',
    $btn: null,
    $wrap: null,
    $slide: null,
    $friendSlide: null,
    $chatWindow: null,
    $slide: null,
    $friendSlide: null,
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

    // Methods

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
    	this.$btn = $('<a class="button meet-trigger"></a>');
    	this.$slide = $('<div class="_1sk6 meet-html" style="bottom: 0px; width: 238px; height: 89px; border-bottom-width: 1px; display: none;border-left-width: 1px;">      <div class="_54_-">        <div class = "meet-upButtons" style="margin-bottom: 5px;margin-top: 3px;">          <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 0px;width: 66px;">            <span class="firstItem lastItem uiButtonGroupItem buttonItem" style="width: 66px;">              <a class="uiButton uiButtonLarge uiButtonOverlay meet-today" role="button" style="width: 50px;">                <span class="uiButtonText">Today</span>              </a>            </span>          </span>          <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px;">            <span class="firstItem lastItem uiButtonGroupItem buttonItem">              <a class="uiButton uiButtonLarge uiButtonOverlay meet-tomorrow" role="button">                <span class="uiButtonText">Tomorrow</span>              </a>            </span>          </span>          <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px;width: 66px;">            <span class="firstItem lastItem uiButtonGroupItem buttonItem" style="">              <a class="uiButton uiButtonLarge uiButtonDepressed meet-soon" role="button" style="width: 50px;">                <span class="uiButtonText">Soon</span>              </a>            </span>          </span>        </div>        <input style="width: 220px;margin-bottom: 4px;" value="Let\'s Hangout" class="inputtext textInput DOMControl_placeholder meet-text" type="text"><input style="width: 220px;margin-bottom: 4px; display: none" placeholder="Location" class="inputtext textInput DOMControl_placeholder meet-loc" type="text">   <a class="meet-loc-btn" href="#" style="vertical-align: -webkit-baseline-middle;">+ Location</a>  <a class="meet-friends-btn" href="#" style="vertical-align: -webkit-baseline-middle; display: none">+ Friends</a>   <label class="uiButton uiButtonConfirm meet-ok" style="width: 64px;float: right;">          <input value="OK" type="submit">        </label>   <label class="close uiButton uiButtonConfirm meet-done" style="width: 12px; float: right; display: none;">  <input value="&times;" type="submit" style="font-size: 15px;">        </label>   </div>    </div>');
    	this.$friendSlide = $('<div class="_1sk6 meet-html" style="display: none; bottom: 0px; width: 238px;  border-bottom-width: 1px; border-left-width: 1px;">      <div class="_54_-">        <div style="margin-bottom: 5px;margin-top: 3px;">          <span style="margin-left: 3px;">Drag here some friends!</span>        </div>        <div class="meet-dropbag" style="width:215px; border:1px solid black; height:65px; padding:3px; margin-left: 3px; margin-bottom: 6px; background-color: white;">        </div>        <label class="uiButton uiButtonConfirm meet-ok" style="width: 77px;margin-left: 3px;margin-right: 33px;margin-bottom: 3px;">          <input value="OK" type="submit">        </label>        <label class="uiButton uiButtonConfirm meet-cancel" style="width: 77px;">          <input value="Cancel" type="submit">        </label>      </div>    </div>');
    	this.$wrap = $('<div style="position: absolute; right: 90px;" data-hover="tooltip" aria-label="FBMeet" data-tooltip-alignh="center" id="js_48"></div>');
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