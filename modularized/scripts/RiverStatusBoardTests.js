//	RiverStatusBoardTests.js

define("RiverStatusBoardTests", [
	'jquery', 'knockout', 'moment',
	'APIConcierge', 'MathRanges', 'TRRASafetyMatrix', 'ColorScales', 'Utilities',
	'RiverStatusBoardApp'
], function ($, ko, moment,
	APIConcierge, MathRanges, TRRASafetyMatrix, ColorScales, Utilities,
	RiverStatusBoardApp
) {
	var theModule = {};
	
	theModule.meta = {
		//	VCS & Copyright
		version: "0.0.1",
		author: "Maxwell B Garber <max.garber+dev@gmail.com>",
		date: "2017-07-01"
	};
	
	theModule.ColorScalesTests = {
		
		testToString: function () {
			var testScale = new ColorScales.Range();
			var testInterval1 = new ColorScales.Interval();
			testInterval1.min = 0;
			testInterval1.max = 5;
			testInterval1.includeMin = true;
			testInterval1.includeMax = false;
			testInterval1.color = '#ffffff';
			testScale.intervals.push(testInterval1);
			var testInterval2 = new ColorScales.Interval();
			testInterval2.min = 5;
			testInterval2.max = 10;
			testInterval2.includeMin = true;
			testInterval2.includeMax = true;
			testInterval2.color = '#000000';
			testScale.intervals.push(testInterval2);
			
			var pass = ( testScale.toString() == "{[0,5)->#ffffff,[5,10]->#000000}");
			return pass;
		},
		
		testColorForValue: function () {
			var testScale = new ColorScales.Range();
			var testInterval1 = new ColorScales.Interval();
			testInterval1.min = 0;
			testInterval1.max = 5;
			testInterval1.includeMin = true;
			testInterval1.includeMax = false;
			testInterval1.color = '#ffffff';
			testScale.intervals.push(testInterval1);
			var testInterval2 = new ColorScales.Interval();
			testInterval2.min = 5;
			testInterval2.max = 10;
			testInterval2.includeMin = true;
			testInterval2.includeMax = true;
			testInterval2.color = '#000000';
			testScale.intervals.push(testInterval2);
			
			var pass1 = ( testScale.colorForValue(3) == testInterval1.color );
			var pass2 = ( testScale.colorForValue(7) == testInterval2.color );
			
			console.log("pass test: colorForValue(3): " + pass1);
			console.log("pass test: colorForValue(7	): " + pass2);
			
			return (pass1 && pass2);
		},
		
		testCreateScale: function () {
			var colors = [
				'#ff0000',	// 0
				'#ff8800',	// 1
				'#88ff00',	// 2
				'#00ff00',	// 3
				'#0000ff',	// 4
				'#ffffff'	// 5
			];
			
			var arg = [
				ColorScales.createInterval( { min:  0, max: 10, includeMin: true, includeMax: false, color: colors[0] } ),
				ColorScales.createInterval( { min: 10, max: 20, includeMin: true, includeMax: false, color: colors[1] } ),
				ColorScales.createInterval( { min: 20, max: 30, includeMin: true, includeMax: false, color: colors[2] } ),
				ColorScales.createInterval( { min: 30, max: 40, includeMin: true, includeMax: false, color: colors[3] } ),
				ColorScales.createInterval( { min: 40, max: 50, includeMin: true, includeMax: false, color: colors[4] } ),
				ColorScales.createInterval( { min: 50, max: 60, includeMin: true, includeMax: false, color: colors[5] } )
			];
			var range = ColorScales.createScale(arg);
			
			var pass1 = range.colorForValue(0) == colors[0];
			var pass2 = range.colorForValue(5) == colors[0];
			var pass3 = range.colorForValue(10) == colors[1];
			var pass4 = range.colorForValue(13.5) == colors[1];
			var pass5 = range.colorForValue(20) == colors[2];
			var pass6 = range.colorForValue(35) == colors[3];
			var pass7 = range.colorForValue(42) == colors[4];
			var pass8 = range.colorForValue(57) == colors[5];
			var pass9 = range.colorForValue(60) == "";
			var pass10 = range.colorForValue(62) == "";
			
			return (pass1 && pass2 && pass3 && pass4 && pass5 && pass6 && pass7 && pass8 && pass9 && pass10);
		}
		
	};
	
	
	return theModule;
});

// EOF
