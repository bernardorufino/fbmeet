/**
* Represents one level up of abstraction from the FB API to manage events.
*/
FBMeet.Event = createClass({

    //TODO...
    create: function(attributes, callback){
    	var event = new FBMeet.Event("urlhere");
    	callback(event);
    	return event;
    }

}, { // Class properties above, instance properties below 

	url: "",

	initialize: function(url) {
		this.url = url;
	}

});