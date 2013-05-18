/**
 * HTML templates for the chat windows.
 */
FBMeet.Chat.Templates = stringfyProperties(16, -3, {

    triggerBtn: function() {/*
<a class="button meet-trigger"></a>
    */},
  
    slide: function() {/*
<div class="_1sk6 meet-slide" style="height: 89px;">
  <div class="_54_-">
    <div class = "meet-upButtons meet-create">
      <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 0px; width: 66px;">
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
      <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px; width: 66px;">
        <span class="firstItem lastItem uiButtonGroupItem buttonItem" style="">
          <a class="uiButton uiButtonLarge uiButtonDepressed meet-soon" role="button" style="width: 50px;">
            <span class="uiButtonText">Soon</span>
          </a>
        </span>
      </span>
    </div>
    <input class="inputtext textInput DOMControl_placeholder meet-create meet-text" type="text" value="Let's Hangout">
    <input class="inputtext textInput DOMControl_placeholder meet-create meet-loc" type="text" placeholder="Location" style="display: none" >
    <a class="meet-create meet-loc-btn" href="#">+ Location</a>
    <a class="meet-invite meet-friends-btn" href="#" style="display: none">+ Friends</a>
    <label class="uiButton uiButtonConfirm meet-create meet-ok" style="width: 64px; float: right;">
      <input value="OK" type="submit">
    </label>
    <label class="close uiButton uiButtonConfirm meet-invite meet-done" style="width: 12px; float: right; display: none;">
      <input value="&times;" type="submit" style="font-size: 15px;">
    </label>
  </div>
</div>
    */},
  
    friendSlide: function() {/*
<div class="_1sk6 meet-slide">
  <div class="_54_-">
    <div style="margin-bottom: 5px;margin-top: 3px;">
      <span style="margin-left: 3px;">Drag here some friends!</span>
    </div>
    <div class="meet-dropbag"></div>
    <label class="uiButton uiButtonConfirm meet-ok" style="width: 77px; margin-left: 3px; margin-right: 33px; margin-bottom: 3px;">
      <input value="OK" type="submit">
    </label>
    <label class="uiButton uiButtonConfirm meet-cancel" style="width: 77px;">
      <input value="Cancel" type="submit">
    </label>
  </div>
</div>
    */},

    wrap: function() {/*
<div style="position: absolute; right: 90px;" data-hover="tooltip" aria-label="FBMeet" data-tooltip-alignh="center" id="js_48">
</div>
    */}

});