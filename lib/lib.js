// Sample 'prototype' creator
function prototype(statics, prototype) {
	var constructorx;
	if (typeof prototype.initialize == "function") {
		constructorx = prototype.initialize;
		delete prototype.initialize;	
	} else {
		constructorx = function() {};
	}
	$.extend(constructorx.prototype, prototype);
	$.extend(constructorx, statics);
	return constructorx;
}

Function.prototype.curry = function(/* ... */) {
	var f = this;
	var firstArgs = $.makeArray(arguments);
	return function(/* ... */) {
		var lastArgs = $.makeArray(arguments);
		return f.apply(this, firstArgs.concat(lastArgs));
	};
}

Function.prototype.includes = function(obj) {
	$.extend(this.prototype, obj);
	return this;
}