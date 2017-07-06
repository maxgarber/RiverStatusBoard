//	
//	RiverStatusBoard: Information for Rowers and Paddlers
//	Allegheny River information for Three Rivers Rowing Association (TRRA)
//	by Maxwell B Garber <max.garber+dev@gmail.com>
//	ColorScales.js created on 2017-07-01
//


define("ColorScales", ['MathRanges', 'Utilities'], function (MathRanges, Utilities) {
	var theModule = {};
	theModule.meta = {
		//	VCS & Copyright
		version: "0.0.1",
		author: "Maxwell B Garber <max.garber+dev@gmail.com>",
		date: "2017-07-03"
	};
	
	//	Types
	theModule.Interval = function () {};
	theModule.Interval.prototype = new MathRanges.Interval();
	theModule.Interval.prototype.color = "";
	theModule.Interval.prototype.toString = function () {
		var str = (this.includeMin ? "[" : "(");
		str += this.min + "," + this.max;
		str += (this.includeMax ? "]" : ")") + "->";
		str += (this.color == "") ? 'null' : this.color;
		return str;
	};
	
	theModule.Range = function () {
		this.intervals = [];
		
		this.colorForValue = function (value) {
			var index = -1;
			for (i = 0; i < this.intervals.length; i++) {
				if (this.intervals[i].containsValue(value)) {
					index = i;
					break;
				}
			}
			if (index != -1) {
				return this.intervals[index].color;
			} else {
				return "";
			}
			
		};
		
		this.toString = function () {
			var str = "{"; 
			var nIntervals = this.intervals.length;
			for(i=0; i<nIntervals; i++) {
				str += (i==0 ? "" : ",") + this.intervals[i].toString();
			}
			str += "}";
			return str;
		};
	};
	
	
	//	Static Methods
	theModule.createInterval = function (arg) {
		var interval = new this.Interval();
		interval.min = arg.min;
		interval.max = arg.max;
		interval.includeMin = arg.includeMin;
		interval.includeMax = arg.includeMax;
		interval.lable = arg.label;
		interval.color = arg.color;
		return interval;
	};
	
	theModule.createScale = function (intervalArray) {
		var range = new this.Range();
		for (j = 0; j < intervalArray.length; j++) {
			// if intervalArray[j].prototype != theModule.Interval.prototype
			var anInterval = intervalArray[j];
			range.intervals.push(anInterval);
		}
		return range;
	};
	
	return theModule;
});

// EOF
