//
//	RiverStatusBoard: Information for Rowers and Paddlers
//	Allegheny River information for Three Rivers Rowing Association (TRRA)
//	by Maxwell B Garber <max.garber+dev@gmail.com>
//	RiverStatusBoardApp.js created on 2017-06-27
//


define("RiverStatusBoardApp", ['jquery', 'knockout', 'moment',
	'APIConcierge', 'MathRanges', 'TRRASafetyMatrix', 'ColorScales', 'Utilities'
], function ($, ko, moment,
	APIConcierge, MathRanges, TRRASafetyMatrix, ColorScales, Utilities
) {
	var theModule = {};
	theModule.meta = {
		//	VCS & Copyright
		version: "0.0.1",
		author: "Maxwell B Garber <max.garber+dev@gmail.com>",
		date: "2017-07-01"
	};
	
	
	//	Basic fields
	theModule.title = "Allegheny River Conditions";
	
	
	//	Methods
	theModule.start = function () {
		console.log('app started');
	};
		
	theModule.update = function () {
		// to be implemented
		console.log('update() invoked');
	};
		
	
	return theModule;
});

// EOF
