function $(id) {
	return document.getElementById(id);
}

ScreenshotManager = {

	SOURCE_TEMPLATE: 'images/screenshots/ss?.png',
	LENGTH: 5,
	FIRST: 1,

	update: function(updater) {
		var image = $('screenshot');
		var regex = this.SOURCE_TEMPLATE.replace('?', '(\\d+)');
		var match = new RegExp(regex).exec(image.src);
		if (!match) return null;
		var index = this.FIRST + updater(parseInt(match[1]) - this.FIRST, this.LENGTH);
		$('counter').innerHTML = index;
		image.src = this.SOURCE_TEMPLATE.replace('?', index);
	}, 

	previousClick: function(e) {
		ScreenshotManager.update(function(i, length){
			return (0 < i && i <= length - 1) ? i - 1 : i;
		});
	},

	nextClick: function(e) {
		var self = ScreenshotManager;
		self.update(function(i, length){
			return (0 <= i && i < length - 1) ? i + 1 : i;
		});
	},

	initialize: function() {
		$("previous").addEventListener('click', this.previousClick, false);
		$("next").addEventListener('click', this.nextClick, false);
	}

}

window.onload = function() {
	ScreenshotManager.initialize();
}