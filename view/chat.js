//Represent a chat window
FBMeet.Chat.Window = prototype({

    // Fields
    when: 'soon',
    $btn: null,
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
    	this.appendHusky(); // The hell is that?
    },

    // WTF??
    appendHusky: function() {
    	$chatWindow.find('._1sk5')
    		.append($slide)
    		.append($friendSlide);
    },

    createElements: function() {
    	this.$btn = $('<a class="button meet-trigger" style="background-image: url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y5/r/ZpsGiyaEt12.png); width: 15px; height: 16px; margin-top: 4px; margin-right: 2px;"></a>');
    	this.$slide = $('<div class="_1sk6 meet-html" style="bottom: 0px; width: 238px; height: 89px; border-bottom-width: 1px; display: none;border-left-width: 1px;">      <div class="_54_-">        <div class = "meet-upButtons" style="margin-bottom: 5px;margin-top: 3px;">          <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 0px;width: 66px;">            <span class="firstItem lastItem uiButtonGroupItem buttonItem" style="width: 66px;">              <a class="uiButton uiButtonLarge uiButtonOverlay meet-today" role="button" style="width: 50px;">                <span class="uiButtonText">Today</span>              </a>            </span>          </span>          <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px;">            <span class="firstItem lastItem uiButtonGroupItem buttonItem">              <a class="uiButton uiButtonLarge uiButtonOverlay meet-tomorrow" role="button">                <span class="uiButtonText">Tomorrow</span>              </a>            </span>          </span>          <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px;width: 66px;">            <span class="firstItem lastItem uiButtonGroupItem buttonItem" style="">              <a class="uiButton uiButtonLarge uiButtonDepressed meet-soon" role="button" style="width: 50px;">                <span class="uiButtonText">Soon</span>              </a>            </span>          </span>        </div>        <input style="width: 220px;margin-bottom: 4px;" value="Let\'s Hangout" class="inputtext textInput DOMControl_placeholder meet-text" type="text"><input style="width: 220px;margin-bottom: 4px; display: none" placeholder="Location" class="inputtext textInput DOMControl_placeholder meet-loc" type="text">   <a class="meet-loc-btn" href="#" style="vertical-align: -webkit-baseline-middle;">+ Location</a>  <a class="meet-friends-btn" href="#" style="vertical-align: -webkit-baseline-middle; display: none">+ Friends</a>   <label class="uiButton uiButtonConfirm meet-ok" style="width: 64px;float: right;">          <input value="OK" type="submit">        </label>   <label class="close uiButton uiButtonConfirm meet-done" style="width: 12px; float: right; display: none;">  <input value="&times;" type="submit" style="font-size: 15px;">        </label>   </div>    </div>');
    	this.$friendSlide = $('<div class="_1sk6 meet-html" style="display: none; bottom: 0px; width: 238px;  border-bottom-width: 1px; border-left-width: 1px;">      <div class="_54_-">        <div style="margin-bottom: 5px;margin-top: 3px;">          <span style="margin-left: 3px;">Drag here some friends!</span>        </div>        <div class="meet-dropbag" style="width:215px; border:1px solid black; height:65px; padding:3px; margin-left: 3px; margin-bottom: 6px; background-color: white;">        </div>        <label class="uiButton uiButtonConfirm meet-ok" style="width: 77px;margin-left: 3px;margin-right: 33px;margin-bottom: 3px;">          <input value="OK" type="submit">        </label>        <label class="uiButton uiButtonConfirm meet-cancel" style="width: 77px;">          <input value="Cancel" type="submit">        </label>      </div>    </div>');
    },

    findElements: function() {
    	this.$today = $slide.find('.meet-today');
    	this.$tomorrow = $slide.find('.meet-tomorrow');
    	this.$soon = $slide.find('.meet-soon');
    	this.$text = $slide.find('.meet-text');
    	this.$loc = $slide.find('.meet-loc');
    	this.$locBtn = $slide.find('.meet-loc-btn');
    	this.$friendsBtn = $slide.find('.meet-friends-btn');
    	this.$okFriends = $slide.find('.meet-ok');
    	this.$cancelFriends = $slide.find('.meet-cancel');
    	this.$dropbag = $slide.find('.meet-dropbag');
    	this.dropbag = this.$dropbag[0];
    	this.$ok = $slide.find('.meet-ok');
    	this.$done = $slide.find('.meet-done');
    },

    setListeners: function() {
    	$today.click(this.whenButtonListener.curry('today'));
    	$tomorrow.click(this.whenButtonListener.curry('tomorrow'));
    	$soon.click(this.whenButtonListener.curry('soon'));
    	with (this) { 
    	// Binds chat object attributes to locals (Just for copy 'n paste croata's code, refactor it!)
    	//TODO: change calls to locals to fields of this obj (correctly localed as chat for e.g)
	    	// Location button?
	    	$locBtn.click(function() {
	    		$slide.animate({height: '114px'}, 250);
	   			$loc.show(300);
	    		$locBtn.hide(200);
	    	});

	    	// Dran 'n Drop
	    	this.dropbag.addEventListener("drop", FBMeet.Chat.DragDrop.drop, false);
	    	this.dropbag.addEventListener("dragover", FBMeet.Chat.DragDrop.dragover, false);
			$friendsBtn.click(function() {
				$slide.slideUp(200);
				$friendSlide.slideDown(270);
				$.each($('.uiScrollableAreaBody li'), function(index, item) {
					var $pic = $(item).find('.pic.img');
					if ($pic && $pic.length > 0) {
				        $pic.attr({id: 'meet-draggable-' + index, draggable: true});
				        $pic[0].addEventListener("dragstart", FBMeet.Chat.DragDrop.dragstart, false);
					}
				});
			});	    	
	    	
	    	// Cancel button when draggin friends
			$cancelFriends.click(function() {
				$dropbag.html("");
				$friendSlide.slideUp(200);
				$slide.slideDown(270);
			});

			// Add event ok button
			$ok.click(function() {
				e.preventDefault();
				disableOkButton(); // chat
				var inviteeName = $chatWindow.find('h4 a').html();
				FBMeet.Event.add({
					"name": $text.val(),
					"location": $loc.val(),
					"date": dateString(),
					"time": "82800", // 23:00 default
					"description": $text.val(),
					"invitee": inviteeName
				});
			});

			// Done butto
			$done.click(function() {
				$slide.slideUp(200);
			});


    	}
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

    whenButtonListener: function(when) {
    	this.when = when;
    	$today.toggleClass('uiButtonOverlay', when != 'today').toggleClass('uiButtonDepressed', when == 'today');
    	$tomorrow.toggleClass('uiButtonOverlay', when != 'tomorrow').toggleClass('uiButtonDepressed', when == 'tomorrow');
    	$soon.toggleClass('uiButtonOverlay', when != 'soon').toggleClass('uiButtonDepressed', when == 'soon');
    }


});