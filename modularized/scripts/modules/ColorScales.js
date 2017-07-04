//	ColorScales.js

define("ColorScales", ['MathRanges', 'Utilities'], function (MathRanges, Utilities) {
	
	var theModule = {};
	
	theModule.meta = {
		//	VCS & Copyright
		version: "0.0.1",
		author: "Maxwell B Garber <max.garber+dev@gmail.com>",
		date: "2017-07-03"
	};
	
	theModule.Interval = function () {};
	theModule.Interval.prototype = new MathRanges.Interval();
	theModule.Interval.prototype.color = "";
	theModule.Interval.prototype.toString = function () {
		return (this.includeMin ? "[" : "(") + this.min + "," + this.max + (this.includeMax ? "]" : ")->" + this.color);
	};
	
	theModule.Range = function () {
		var intervals = [];	
	};
		
	
	return theModule;
});

// EOF
