// Sample 'prototype' creator
function prototype(prototype) {
	var constructor;
	if (typeof prototype.initialize == "function") {
		constructor = prototype.initialize;
		delete prototype.initialize;	
	} else {
		constructor = function() {};
	}
	$.extend(constructor.prototype, prototype);
	return constructor;
}

Function.prototype.curry = function(args /*, ... */) {
	var f = this
	var firstArgs = Array.prototype.slice.call(arguments, 1);
	return function(/* ... */) {
		var lastArgs = Array.prototype.slice.call(arguments);
		return f.apply(this, firstArgs.concat(lastArgs));
	};
}