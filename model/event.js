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
        // Creates a new event
        FB.post('/me/events', data).done(function(response, status, xhr) {
            var eventId = response.id;
            // Retrieves the id for the invitee, whose identifier can be a name
            FB.retrieveId(invitee, function(inviteeId){
                // Invites the invitee
                FB.post('/' + eventId + '/invited/' + inviteeId).done(function(response, status, xhr) {
                    // Now returns the event to the callback with fresh info
                    FBMeet.Event.find(eventId, callback);
                });    
            });
        });
    },

    find: function(id, callback) {
        FB.get('/' + id, {
            fields: 'name,location,start_time,invited.fields(id,picture.width(32).height(32))'
        }).done(function(response, status, xhr) {
            var invited = $.map(response.invited.data, function(user) {
                return {id: user.id, picture: user.picture.data.url};
            });
            var location = (response.location) ? response.location : null;
            var event = new FBMeet.Event(response.id, response.name, location, response.start_time, invited);
            callback(event);
        });
    } 

}, { // Class properties above, instance properties below 

    id: null,
    url: null,
    name: null,
    location: null,
    startTime: null,
    invited: [],

	initialize: function(id, name, location, startTime, invited) {
        this.id = id;
		this.url = 'https://www.facebook.com/events/' + id;
        this.name = name;
        this.location = location;
        this.startTime = startTime;
        this.invited = invited;
	}, 

    // TODO: Prettify this thing
    prettyDate: function() {
        var parts = this.startTime.split('-');
        var year = parts[0];
        var month = parts[1];
        var day = parts[2];
        return day + '/' + month + '/' + year;
    },

    invite: function(invitee, callback) {
        var eventId = this.id;
        var event = this;
        FB.retrieveId(invitee, function(inviteeId){
            FB.post('/' + eventId + '/invited/' + inviteeId).done(function(response, xhr, status) {
                if (response) event.invited.push({id: inviteeId, picture: null});
                callback(event, response);
            });    
        });
    },

    uninvite: function(invitee, callback) {
        var eventId = this.id;
        var event = this;
        FB.retrieveId(invitee, function(inviteeId){
            FB.destroy('/' + eventId + '/invited/' + inviteeId).done(function(response, xhr, status) {
                if (response) {
                    // Removes from the invitee's list
                    for (var i = 0; i < event.invited.length; i++) {
                        if (inviteeId === event.invited[i].id) {
                            event.invited.splice(i--, 1);
                        }
                    }
                }
                callback(event, response);
            });    
        });
    },

    debug: function(tag) {
        console.log("<" + tag + ">");
        console.log("  id = " + this.id);
        console.log("  url = " + this.url);
        console.log("  name = " + this.name);
        console.log("  location = " + this.location);
        console.log("  startTime = " + this.startTime);
        console.log("  invited people");
        console.log(this.invited);
        console.log("  /invited people");
        console.log("</" + tag + ">");
    }

});