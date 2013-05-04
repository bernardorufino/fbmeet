function allowDrop(ev){
  ev.preventDefault();
}

function drag(ev){
  ev.dataTransfer.setData("Id", ev.target.id);
  ev.target.name = $(ev.target).parent().parent().find('div')[4].innerHTML;
}

function drop(ev){
  ev.preventDefault();
  var data = ev.dataTransfer.getData("Id");
  $target = $(ev.target);
  var img = $('#' + data).clone().attr('width', 28).attr('height', 28).css('margin-top', '3px').css('margin-right', '2px');
  img[0].name = $("#" + data)[0].name;
  $target.append(img);
}

function success($btn, $slide, $chatWindow, eventLink){
  $btn.css('background-image', 'url("https://raw.github.com/bernardorufino/site/master/event_ok.png")');
  $btn.unbind('click.fbMeet');
  $btn.bind('click.fbMeet', function(e){ e.stopPropagation(); });
	$slide.find('.meet-upButtons').hide(200);
	$slide.find('.meet-text').hide(200);
	$slide.find('.meet-loc').hide(200);
	$slide.find('.meet-loc-btn').hide(200);	
	$slide.find('.meet-ok').hide(200);
  $slide.animate({height: '27px'}, 250);
	$slide.find('.meet-friends-btn').show(200);
  $slide.find('.meet-done').show(200);
  var e = $.Event("keydown");
  e.which = 13; //choose the one you want
  e.keyCode = 13;
  $("textarea.uiTextareaAutogrow", $chatWindow).val(eventLink.replace("/?context=create", "")).trigger(e);
  $chatWindow[0].eventLink = eventLink;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.response) {
      var id = button_mapping[request.id];
      success(id.btn, id.slide, id.chatWindow, request.eventLink);
    }
  }
);

button_mapping = [];

function Button($chatWindow){
  var $btn = $('<a class="button meet-trigger" style="background-image: url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/y5/r/ZpsGiyaEt12.png); width: 15px; height: 16px; margin-top: 4px; margin-right: 2px;"></a>');
  var $slide = $('<div class="_1sk6 meet-html" style="bottom: 0px; width: 238px; height: 89px; border-bottom-width: 1px; display: none;border-left-width: 1px;">      <div class="_54_-">        <div class = "meet-upButtons" style="margin-bottom: 5px;margin-top: 3px;">          <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 0px;width: 66px;">            <span class="firstItem lastItem uiButtonGroupItem buttonItem" style="width: 66px;">              <a class="uiButton uiButtonLarge uiButtonOverlay meet-today" role="button" style="width: 50px;">                <span class="uiButtonText">Today</span>              </a>            </span>          </span>          <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px;">            <span class="firstItem lastItem uiButtonGroupItem buttonItem">              <a class="uiButton uiButtonLarge uiButtonOverlay meet-tomorrow" role="button">                <span class="uiButtonText">Tomorrow</span>              </a>            </span>          </span>          <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px;width: 66px;">            <span class="firstItem lastItem uiButtonGroupItem buttonItem" style="">              <a class="uiButton uiButtonLarge uiButtonDepressed meet-unset" role="button" style="width: 50px;">                <span class="uiButtonText">Soon</span>              </a>            </span>          </span>        </div>        <input style="width: 220px;margin-bottom: 4px;" value="Let\'s Hangout" class="inputtext textInput DOMControl_placeholder meet-text" type="text"><input style="width: 220px;margin-bottom: 4px; display: none" placeholder="Location" class="inputtext textInput DOMControl_placeholder meet-loc" type="text">   <a class="meet-loc-btn" href="#" style="vertical-align: -webkit-baseline-middle;">+ Location</a>  <a class="meet-friends-btn" href="#" style="vertical-align: -webkit-baseline-middle; display: none">+ Friends</a>   <label class="uiButton uiButtonConfirm meet-ok" style="width: 64px;float: right;">          <input value="OK" type="submit">        </label>   <label class="close uiButton uiButtonConfirm meet-done" style="width: 12px; float: right; display: none;">  <input value="&times;" type="submit" style="font-size: 15px;">        </label>   </div>    </div>');
  var $friendSlide = $('<div class="_1sk6 meet-html" style="display: none; bottom: 0px; width: 238px;  border-bottom-width: 1px; border-left-width: 1px;">      <div class="_54_-">        <div style="margin-bottom: 5px;margin-top: 3px;">          <span style="margin-left: 3px;">Drag here some friends!</span>        </div>        <div class="meet-dropbag" style="width:215px; border:1px solid black; height:65px; padding:3px; margin-left: 3px; margin-bottom: 6px; background-color: white;">        </div>        <label class="uiButton uiButtonConfirm meet-ok" style="width: 77px;margin-left: 3px;margin-right: 33px;margin-bottom: 3px;">          <input value="OK" type="submit">        </label>        <label class="uiButton uiButtonConfirm meet-cancel" style="width: 77px;">          <input value="Cancel" type="submit">        </label>      </div>    </div>');
	var $today = $slide.find('.meet-today');
  var $tomorrow = $slide.find('.meet-tomorrow');
  var $unset = $slide.find('.meet-unset');
  var $text = $slide.find('.meet-text');
  var $loc = $slide.find('.meet-loc');
  var $locBtn = $slide.find('.meet-loc-btn');
	var $friendsBtn = $slide.find('.meet-friends-btn');
  var $okFriends = $friendSlide.find('.meet-ok');
  var $cancelFriends = $friendSlide.find('.meet-cancel');
  var $dropBag = $friendSlide.find('.meet-dropbag');
  var $ok = $slide.find('.meet-ok');
  var $done = $slide.find('.meet-done');
  
  var state = 3;
  
  $okFriends.click(function(e){
    e.preventDefault();
    names = [];
    $.each($dropBag.children(), function(i, e) {
      names.push(e.name);
    });
    chrome.runtime.sendMessage({
      invitePeople: names,
      eventLink: $chatWindow[0].eventLink
    }, function() { return true; });
    $slide.slideUp(200);
  });
  $btn.bind('click.fbMeet', function(e){
    e.stopPropagation();
    if($slide.css('display') == "none")
      $slide.slideDown(200);
    else
      $slide.slideUp(200);
  });
  $today.click(function(){
    $today.removeClass('uiButtonOverlay').addClass('uiButtonDepressed');
    $tomorrow.addClass('uiButtonOverlay').removeClass('uiButtonDepressed');
    $unset.addClass('uiButtonOverlay').removeClass('uiButtonDepressed');
    state = 1;
  });
  $tomorrow.click(function(){
    $today.addClass('uiButtonOverlay').removeClass('uiButtonDepressed');
    $tomorrow.removeClass('uiButtonOverlay').addClass('uiButtonDepressed');
    $unset.addClass('uiButtonOverlay').removeClass('uiButtonDepressed');
    state = 2;
  });
  $unset.click(function(){
    $today.addClass('uiButtonOverlay').removeClass('uiButtonDepressed');
    $tomorrow.addClass('uiButtonOverlay').removeClass('uiButtonDepressed');
    $unset.removeClass('uiButtonOverlay').addClass('uiButtonDepressed');
    state = 3;
  });
  $locBtn.click(function(){
    $slide.animate({height: '114px'}, 250);
    $loc.show(300);
    $locBtn.hide(200);
  });
  $dropBag[0].addEventListener("drop", drop, false);
  $dropBag[0].addEventListener("dragover", allowDrop, false);
	$friendsBtn.click(function(){
    $slide.slideUp(200);
    $friendSlide.slideDown(270);
    $.each($('.uiScrollableAreaBody li'), function(index, item){
      var $pic = $(item).find('.pic.img');
      if($pic && $pic.length > 0){
        $pic.attr('id', 'meet-draggable-' + index);
        $pic.attr('draggable', 'true');
        $pic[0].addEventListener("dragstart", drag, false);
      }
    });
  });
  $cancelFriends.click(function(){
    $dropBag.html('');
    namesList = [];
    $friendSlide.slideUp(200);
    $slide.slideDown(270);
  });
  $ok.click(function(e){
    e.preventDefault();
    name = $chatWindow.find('h4 a').html();
    
    $ok.children().css('color', '#BBBBBB');
    $ok.css('cursor', 'default');
    $ok.children().css('cursor', 'default');
    $ok.unbind('click');
    $ok.children().unbind('click');
    $btn.css('background-image', 'url("https://fbstatic-a.akamaihd.net/rsrc.php/v2/yk/r/LOOn0JtHNzb.gif")');
    
     
    var strDate = new Date();
    var dd = strDate.getDate();
    var mm = strDate.getMonth()+1; //January is 0!

    if (state == 2) 
      dd++;

    var yyyy = strDate.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} strDate = mm+'/'+dd+'/'+yyyy;

    button_mapping.push({btn: $btn, slide: $slide, chatWindow: $chatWindow})

    $FBMeet.addEvent({
      "name": $text.val(),
      "location": $loc.val(),
      "date": strDate,
      "time": "82800",
      "description": $text.val(),
      "invitee": name

    }, button_mapping.length - 1);

    // alert('state: ' + state + '; text: ' + $text.val() + "; name: " + name + "; loc: " + );
  });
  
  $done.click(function(){
    $slide.slideUp(200);
  });
  
  var $husky = $chatWindow.find('._1sk5');
  $husky.append($slide);
  $husky.append($friendSlide);
  return {btn: $btn};
}

$(function(){
  var $tabs = null;
  while($tabs === null){
    $tabs = $('#fbDockChatTabs');
  }
  
	var len = $tabs.children().length;
  
  $.each($tabs.children(), function(index, item){
    var wrap = $('<div style="position: absolute; right: 90px;" data-hover="tooltip" aria-label="fbMeet" data-tooltip-alignh="center" id="js_48"></div>');
    var btn = Button($(item));
    wrap.append(btn.btn);
    $(item).find('.mls').prepend(wrap);
    $( "textarea.uiTextareaAutogrow", $(item)).bind('keyup', registerChatInput);
  });
  
  var obs = new WebKitMutationObserver(function(){
    var newLen = $tabs.children().length;
    if(newLen > len){
      var wrap = $('<div style="position: absolute; right: 90px;" data-hover="tooltip" aria-label="fbMeet" data-tooltip-alignh="center" id="js_48"></div>');
      var $chatWindow = $tabs.children(':first'); 
      var btn = Button($chatWindow);
      wrap.append(btn.btn);
      $chatWindow.find('.mls').prepend(wrap);
      
      $( "textarea.uiTextareaAutogrow", $chatWindow).bind('keyup', registerChatInput);
    }
    len = newLen;
  });
  
  obs.observe($tabs[0], {'childList' : true});
});

function registerChatInput(e){
   if ( e.keyCode == 13 ) {
   var root =  this.parentNode.parentNode.parentNode;
   var lastmsg = $("div[data-jsid='message']._kso.fsm.direction_ltr:last", root).html();

   expressions_event = ["meet", "go out", "hang out"];
   time_today="today";
   time_tomorrow="tomorrow";
   time_soon="soon";

   var found_time_today;
   var found_time_tomorrow;
   var found_time_soon;
   var found_events = [];
  
  $.each(expressions_event, function(index, expr) {
   if(lastmsg.search(expr) != -1) {
     found_events.push(expr);
   }
  });

  found_time_today = (lastmsg.search(time_today) != -1);
  found_time_tomorrow = (lastmsg.search(time_tomorrow) != -1);
  found_time_soon = (lastmsg.search(time_soon) != -1);



  if ( found_events.length && ( found_time_today || found_time_tomorrow || found_time_soon )){

    if ($(".meet-html").css("display") == "none"){
    $(".meet-trigger", root).click(); 
    }

    if (found_time_today)
    $(".meet-today", root).click();
    else if (found_time_tomorrow)
    $(".meet-tomorrow", root).click();
    else
    $(".meet-unset", root).click();
  }

   }
  }