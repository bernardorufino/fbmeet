window.onload = function(){ // this could be done faster with the livequery() plugin for jquery
elt = document.createElement('iframe');
elt.id = 'facebook_load_frame';
elt.src = 'https://guarded-shore-9998.herokuapp.com/iframe.html';
document.getElementsByTagName('body')[0].appendChild(elt);
};
// Message passing API from David Walsh at http://davidwalsh.name/window-iframe
// Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
// Listen to message from child window
eventer(messageEvent,function(e) {
 console.log("Connection status: "+e.data.connectStatus+"; UserID: "+e.data.userID+"; AccessToken: "+e.data.accessToken);
 //This is the data from the Facebook SDK
},false);