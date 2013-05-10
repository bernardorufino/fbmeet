/**
* Some useful methods. 
*/
//TODO: Put it into an object FBMeet.Utils (or not?)

/**
* Creates a class and returns it, first argument is a object that contains
* static properties, second argument is a object that contains instance properties.
*/
function createClass(statics, instances) {
	var constructor;
	if (typeof instances.initialize == 'function') {
		constructor = instances.initialize;
		delete instances.initialize;	
	} else {
		constructor = function() {};
	}
	$.extend(constructor.prototype, instances);
	$.extend(constructor, statics);
	return constructor;
}

/** 
* Function currying. Eg:
* 	
*   function foo(a, b, c) {return "a = " + a + "; b = " + b + "; c = " + c}
*	var bar = foo.curry(1)
*   var baz = foo.curry(3, 4)
*   var chu = foo.curry(3).curry(4)
*   bar(2, 3)  //=> a = 1; b = 2; c = 3
*   baz(5)     //=> a = 3; b = 4; c = 5
*   chu(7)     //=> a = 3; b = 4; c = 7
*/
Function.prototype.curry = function(/* ... */) {
	var f = this;
	var firstArgs = $.makeArray(arguments);
	return function(/* ... */) {
		var lastArgs = $.makeArray(arguments);
		return f.apply(this, firstArgs.concat(lastArgs));
	};
}

/** 
* Includes _obj_ in the current class as instance properties.
*/
Function.prototype.includes = function(instances) {
	$.extend(this.prototype, instances);
	return this;
}

/**
* See view/templates.js
*/
function stringfyProperties(begin, end, obj) {
	for (property in obj) {
		if (typeof obj[property] == "function") {
			// Slice between begin and end, remove head spaces
			obj[property] =  obj[property].toString().slice(begin, end).replace(/^\s+/, "");
		}
	}
	return obj;
}