//	MathRanges.js

define("MathRanges", ['Utilities'], function (Utilities) {
	
	var theModule = {};
	
	theModule.meta = {
		//	VCS & Copyright
		version: "0.0.1",
		author: "Maxwell B Garber <max.garber+dev@gmail.com>",
		date: "2017-07-03"
	};
	
	theModule.Interval = function () {
		this.min = 0;
		this.max = 0;
		this.includeMin = false;
		this.includeMax = false;
		
		this.toString = function () {
			return (this.includeMin ? "[" : "(") + this.min + "," + this.max + (this.includeMax ? "]" : ")");
		}
	};
	
	theModule.Range = function () {
		this.intervals = [];
		
		this.toString = function () {
			var str = "{"; 
			var nIntervals = this.intervals.length;
			for(i=0; i<nIntervals; i++) {
				str += (i==0 ? "" : ",") + this.intervals[i].toString();
			}
			str += "}";
			return str;
		}
	};
	
	return theModule;
});

// EOF
