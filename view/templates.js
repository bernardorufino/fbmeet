/**
 * HTML templates for the chat windows.
 */
FBMeet.Chat.Templates = stringfyProperties(16, -3, {

    triggerBtn: function() {/*
<a class="button meet-trigger"></a>
    */},
  
    slide: function() {/*
<div class="_1sk6 meet-slide meet-new-event" style="height: 89px;">
  <div class="_54_-">
    <div class = "meet-upButtons meet-create">
      <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 0px;">
        <span class="firstItem lastItem uiButtonGroupItem buttonItem">
          <a class="uiButton uiButtonLarge uiButtonOverlay meet-today" role="button">
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
      <span class="uiButtonGroup mlm uiButtonGroupOverlay" style="margin-left: 1px;">
        <span class="firstItem lastItem uiButtonGroupItem buttonItem">
          <a class="uiButton uiButtonLarge uiButtonDepressed meet-soon" role="button">
            <span class="uiButtonText">Soon</span>
          </a>
        </span>
      </span>
    </div>
    <input class="inputtext textInput DOMControl_placeholder meet-create meet-text" type="text" value="Meetup">
    <input class="inputtext textInput DOMControl_placeholder meet-create meet-loc" type="text" placeholder="Location" style="display: none" >
    <a class="meet-create meet-loc-btn" href="#">+ Location</a>
    <a class="meet-invite meet-friends-btn" href="#">+ Friends</a>
    <label class="uiButton uiButtonConfirm meet-create meet-ok">
      <input value="OK" type="submit">
    </label>
    <label class="close uiButton uiButtonConfirm meet-invite meet-done">
      <input value="&times;" type="submit" style="font-size: 15px;">
    </label>
  </div>
</div>
    */},
  
    friendSlide: function() {/*
<div class="_1sk6 meet-slide meet-friend">
  <div class="_54_-">
    <div class="meet-event-info">
      <a class="info name" href="#eventUrl">Meetup</a> on <span class="info start_time">02/08/2007</span>
      <span class="location-wrapper">
         at <span class="info location">Starbucks</span>
      </span>
    </div>
    <div class="meet-dropbag"></div>
    <div class="meet-drag-message">
      Drag chat friends here! <span class="meet-drop-dismiss">Click them to dismiss</span>
    </div>
  </div>
</div>
    */},

    wrap: function() {/*
<div style="position: absolute; right: 90px;" data-hover="tooltip" aria-label="FBMeet" data-tooltip-alignh="center" id="js_48">
</div>
    */}

});