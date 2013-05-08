//popup.js

alert("entered main javascript;");

function clickHandler(e){
	alert("Entered clickHandler");
	openLoginPopup('https://www.facebook.com/dialog/oauth?' + 
		'client_id=315621838568609&response_type=token&scope=email&' +
		'redirect_uri=http://www.facebook.com/connect/login_success.html');
}

function openLoginPopup(url){
	newwindow=window.open(url);
	if (window.focus) {newwindow.focus()}
	return false;
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
  main();
});



//href="https://www.facebook.com/dialog/oauth?client_id=315621838568609&response_type=token&scope=email&redirect_uri=http://www.facebook.com/connect/login_success.html"