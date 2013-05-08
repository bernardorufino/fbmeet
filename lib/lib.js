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