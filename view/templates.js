/**
 * HTML templates for the chat windows
 */
FBMeet.Chat.Templates = (function(){
  var begin = 16;
  var end = -3;
  
  return {
    triggerBtn: '<a class="button meet-trigger"></a>',
  
    slide: function (){/*
<div class="_1sk6 meet-slide" style="bottom: 0px; width: 238px; height: 89px; border-bottom-width: 1px; display: none;border-left-width: 1px;">
  <div class="_54_-">
    <div class = "meet-upButtons" style="margin-bottom: 5px;margin-top: 3px;">
      <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 0px;width: 66px;">
        <span class="firstItem lastItem uiButtonGroupItem buttonItem" style="width: 66px;">
          <a class="uiButton uiButtonLarge uiButtonOverlay meet-today" role="button" style="width: 50px;">
            <span class="uiButtonText">Today</span>
          </a>
        </span>
      </span>
      <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px;">
        <span class="firstItem lastItem uiButtonGroupItem buttonItem">
          <a class="uiButton uiButtonLarge uiButtonOverlay meet-tomorrow" role="button">
            <span class="uiButtonText">Tomorrow</span>
          </a>
        </span>
      </span>
      <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px;width: 66px;">
        <span class="firstItem lastItem uiButtonGroupItem buttonItem" style="">
          <a class="uiButton uiButtonLarge uiButtonDepressed meet-soon" role="button" style="width: 50px;">
            <span class="uiButtonText">Soon</span>
          </a>
        </span>
      </span>
    </div>
    <input style="width: 220px;margin-bottom: 4px;" value="Let's Hangout" class="inputtext textInput DOMControl_placeholder meet-text" type="text">
    <input style="width: 220px;margin-bottom: 4px; display: none" placeholder="Location" class="inputtext textInput DOMControl_placeholder meet-loc" type="text">
    <a class="meet-loc-btn" href="#" style="vertical-align: -webkit-baseline-middle;">+ Location</a>
    <a class="meet-friends-btn" href="#" style="vertical-align: -webkit-baseline-middle; display: none">+ Friends</a>
    <label class="uiButton uiButtonConfirm meet-ok" style="width: 64px;float: right;">
      <input value="OK" type="submit">
    </label>
    <label class="close uiButton uiButtonConfirm meet-done" style="width: 12px; float: right; display: none;">
      <input value="&times;" type="submit" style="font-size: 15px;">
    </label>
  </div>
</div>*/}.toString().slice(begin, end),
  
    friendSlide: function (){/*
<div class="_1sk6 meet-slide" style="display: none; bottom: 0px; width: 238px;  border-bottom-width: 1px; border-left-width: 1px;">
  <div class="_54_-">
    <div style="margin-bottom: 5px;margin-top: 3px;">
      <span style="margin-left: 3px;">Drag here some friends!</span>
    </div>
    <div class="meet-dropbag" style="width:215px; border:1px solid black; height:65px; padding:3px; margin-left: 3px; margin-bottom: 6px; background-color: white;">
    </div>
    <label class="uiButton uiButtonConfirm meet-ok" style="width: 77px;margin-left: 3px;margin-right: 33px;margin-bottom: 3px;">
      <input value="OK" type="submit">
    </label>
    <label class="uiButton uiButtonConfirm meet-cancel" style="width: 77px;">
      <input value="Cancel" type="submit">
    </label>
  </div>
</div>*/}.toString().slice(begin, end),

    wrap: '<div style="position: absolute; right: 90px;" data-hover="tooltip" aria-label="FBMeet" data-tooltip-alignh="center" id="js_48"></div>'
  };
})();