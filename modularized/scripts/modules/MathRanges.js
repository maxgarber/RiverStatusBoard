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
		this.label = "";
		
		this.containsValue = function (value) {
			var okByMin;
			if (this.includeMin) {
				okByMin = (value >= this.min);
			} else {
				okByMin = (value > this.min);
			}
			var okByMax;
			if (this.includeMax) {
				okByMax = (value <= this.max);
			} else {
				okByMax = (value < this.max);
			}
			return (okByMin && okByMax);
		};
		
		this.toString = function () {
			return (this.includeMin ? "[" : "(") + this.min + "," + this.max + (this.includeMax ? "]" : ")");
		};
	};
	
	theModule.Range = function () {
		this.intervals = [];
		
		this.intervalIndexForValue = function (value) {
			var index = -1;
			for(j = 0; j < this.intervals.length; j++) {
				if (this.intervals[j] != null && this.intervals[j].containsValue(value)) {
					index = j;
					break;
				}
			}
			return index;
		};
		
		this.intervalLabelForValue = function (value) {
			var index = -1;
			for(j = 0; j < this.intervals.length; j++) {
				if (this.intervals[j] != null && this.intervals[j].containsValue(value)) {
					index = j;
					break;
				}
			}			
			if (index != -1) {
				return this.intervals[index].label;
			} else {
				return null;
			}	
		};
		
		this.toString = function () {
			var str = "{"; 
			var nIntervals = this.intervals.length;
			for(i = 0; i < nIntervals; i++) {
				str += (i==0 ? "" : ",") + this.intervals[i].toString();
			}
			str += "}";
			return str;
		};
		
	};
	
	
	theModule.createInterval = function (arg) {
		var interval = new this.Interval();
		interval.min = arg.min;
		interval.max = arg.max;
		interval.includeMin = arg.includeMin;
		interval.includeMax = arg.includeMax;
		interval.label = arg.label;
		return interval;
	};
	
	theModule.createRange = function (intervalArray) {
		var range = new this.Range();
		if (intervalArray == null) { return null; }
		for (j = 0; j < intervalArray.length; j++) {
			if (intervalArray[j].prototype != theModule.Interval.prototype) {
				intervalArray[j] = theModule.createInterval(intervalArray[j]);
			}
			var anInterval = intervalArray[j];
			range.intervals.push(anInterval);
		}
		return range;
	};
	
	
	return theModule;
});

// EOF
