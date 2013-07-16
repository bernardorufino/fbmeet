FB = {

	get: function(url, data) {
		return FB.request(url, 'GET', data);
	},

	post: function(url, data) {
		return FB.request(url, 'POST', data);
	},

	/* delete is keyword =( */
	destroy: function(url, data) {
		return FB.request(url, 'DELETE', data);
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

	extractUserId: function(url) {
		var match;
		match = /^(?:https?:\/\/(?:www.)?facebook.com)?\/(\w+)$/.exec(url);
		if (match) return match[1];
		match = /^(?:https?:\/\/(?:www.)?facebook.com)?\/messages\/(\w+)$/.exec(url)
		if (match) return match[1];
		return null;
	},

	retrieveId: function(person, callback) {
		FB.get('/' + person, {fields: 'id'}).done(function(response, status, xhr) {
			callback(response.id);
		});
	}

};