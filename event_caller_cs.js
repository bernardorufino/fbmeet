$FBMeet = {

	addEvent: function(parameters, id) {
		//Calls the event_manager and tell it to create the event
		chrome.runtime.sendMessage({
			addEvent: parameters,
			id: id
		}, function() { return true; });
	}

}