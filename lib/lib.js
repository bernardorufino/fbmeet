// Sample 'prototype' creator
function prototype(statics, prototype) {
	var constructor;
	if (typeof prototype.initialize == "function") {
		constructor = prototype.initialize;
		delete prototype.initialize;	
	} else {
		constructor = function() {};
	}
	$.extend(constructor.prototype, prototype);
	$.extend(constructor, statics);
	return constructor;
}

Function.prototype.curry = function(/* ... */) {
	var f = this
	var firstArgs = $.makeArray(arguments);
	return function(/* ... */) {
		var lastArgs = $.makeArray(arguments);
		console.log(firstArgs);
		return f.apply(this, firstArgs.concat(lastArgs));
	};
}

Function.prototype.includes = function(obj) {
	return $.extend(this, obj);
}