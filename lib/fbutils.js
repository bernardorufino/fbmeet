FB = {

	get: function(url, data) {
		return FB.request(url, 'GET', data);
	},

	post: function(url, data) {
		return FB.request(url, 'POST', data);
	},

	request: function(url, type, data) {
		var append = (FBMeet.token) ? {'access_token': FBMeet.token} : {};
		if (!FBMeet.token) {
			console.log('FBMeet: Sending without token, please check.');
		}
		data = $.extend(append, data);
		return $.ajax('https://graph.facebook.com' + url, {
			data: data,
			// Already detected by the MIME type of response
			//dataType: 'json',
			type: type
		});
	},

	extractId: function(url) {
		var pattern = /https?:\/\/(?:www.)?facebook.com\/(\w+)/;
		var match = pattern.exec(url);
		return (match) ? match[1] : null;
	},

	retrieveId: function(person, callback) {
		FB.get('/' + person, {fields: 'id'}).done(function(response, status, xhr) {
			callback(response.id);
		});
	}

};