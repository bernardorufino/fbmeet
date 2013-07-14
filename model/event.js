/**
* Represents one level up of abstraction from the FB API to manage events.
*/
FBMeet.Event = createClass({

    privacy: 'SECRET',

    //TODO...
    create: function(attributes, callback){
        
        var data = {
            name: attributes.name,
            start_time: attributes.date,
            description: attributes.description,
            privacy_type: this.privacy
        };
        if (attributes.location) data.location = attributes.location;
        var invitee = attributes.invitee;
        console.log(data);
        FB.post('/me/events', data).done(function(response, status, xhr) {
            var event = new FBMeet.Event(response.id);
            event.invite(invitee);
            callback(event);
        });
    }

}, { // Class properties above, instance properties below 

	url: "",
    id: "",

	initialize: function(id) {
        this.id = id
		this.url = 'https://www.facebook.com/events/' + id;
	},

    invite: function(invitee) {
        var eventId = this.id;
        FB.retrieveId(invitee, function(inviteeId){
            FB.post('/' + eventId + '/invited/' + inviteeId);    
        });
    }

});