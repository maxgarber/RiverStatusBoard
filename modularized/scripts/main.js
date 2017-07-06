//
//	RiverStatusBoard: Information for Rowers and Paddlers
//	Allegheny River information for Three Rivers Rowing Association (TRRA)
//	by Maxwell B Garber <max.garber+dev@gmail.com>
//	main.js created on 2017-06-26
//


//	Globally-accessible configuration parameters
var globalConfiguration = {
	debugMode: false,
	siteVersion: "0.0.1",
	serverMode: false		// if true, RiverStatusBoard can respond to messages received from other entities
};
window.globalConfiguration = globalConfiguration;


//	Logging
if (globalConfiguration.debugMode) {
	console.log("[LOG] main.js: ✅ loaded main.js successfully");
}


//	RequireJS configuration
requirejs.config({
	baseUrl: './scripts',
	paths: {
		//	Libraries -- 3rd party scripts
		jquery: 'libraries/jquery-3.2.1.min',
		knockout: 'libraries/knockout-3.4.2',
		moment: 'libraries/moment-2.18.1.min',
		
		//	Modules -- 1st party scripts
		APIConcierge: 'modules/APIConcierge/APIConcierge',
		MathRanges: 'modules/MathRanges',
		TRRASafetyMatrix: 'modules/TRRASafetyMatrix',
		ColorScales: 'modules/ColorScales',
		Utilities: 'modules/Utilities',
		
		//	Unit tests & application object
		RiverStatusBoardTests: 'RiverStatusBoardTests',
		RiverStatusBoardApp: 'RiverStatusBoardApp'
	}
});


//	RequireJS module loading & synchronous application start
require([
		'jquery', 'knockout', 'moment',
		'APIConcierge', 'MathRanges', 'TRRASafetyMatrix', 'ColorScales', 'Utilities',
		'RiverStatusBoardTests', 'RiverStatusBoardApp'
	], function (
		$, ko, moment, 
		APIConcierge, MathRanges, TRRASafetyMatrix, ColorScales, Utilities,
		RiverStatusBoardTests, RiverStatusBoardApp
	) {
		// to allow global debugging access within browser
		window.modules = {
			jQuery: $,
			Knockout: ko,
			Moment: moment,
			APIConcierge: APIConcierge,
			MathRanges: MathRanges,
			TRRASafetyMatrix: TRRASafetyMatrix,
			ColorScales: ColorScales,
			Utilities: Utilities,
			RiverStatusBoardTests: RiverStatusBoardTests,
			RiverStatusBoardApp: RiverStatusBoardApp
		};
		
		//	preliminary loader debugging
		if (globalConfiguration.debugMode) {
			var success = true;
			if ($ != null && $ == jQuery) {
				console.log('[LOG] main.js: ✅ loaded jQuery successfully')
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load jQuery');
				success = false;
			}
			if (ko != null && typeof ko.observable == 'function') {
				console.log('[LOG] main.js: ✅ loaded Knockout successfully');
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load Knockout');
				success = false;
			}
			if (moment != null) {
				console.log('[LOG] main.js: ✅ loaded Moment successfully');
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load Moment');
				success = false;
			}
			if (APIConcierge != null && APIConcierge.version != "") {
				console.log('[LOG] main.js: ✅ loaded APIConcierge successfully');
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load APIConcierge');
				success = false;
			}
			if (MathRanges != null && MathRanges.version != "") {
				console.log('[LOG] main.js: ✅ loaded MathRanges successfully');
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load MathRanges');
				success = false;
			}
			if (TRRASafetyMatrix != null && TRRASafetyMatrix.version != "") {
				console.log('[LOG] main.js: ✅ loaded TRRASafetyMatrix successfully');
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load TRRASafetyMatrix');
				success = false;
			}
			if (ColorScales != null && ColorScales.version != "") {
				console.log('[LOG] main.js: ✅ loaded ColorScales successfully');
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load ColorScales');
				success = false;
			}
			if (Utilities != null && Utilities.version != "") {
				console.log('[LOG] main.js: ✅ loaded Utilities successfully');
				window.modules.Utilities = Utilities;
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load Utilities');
				success = false;
			}
			
			if (RiverStatusBoardTests != null) {
				console.log('[LOG] main.js: ✅ loaded RiverStatusBoardAppTests successfully');
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load RiverStatusBoardTests');
				success = false;
			}
			if (RiverStatusBoardApp != null) {
				console.log('[LOG] main.js: ✅ loaded RiverStatusBoardApp successfully');
			} else {
				console.log('[LOG] main.js: ❌ ERROR could not load RiverStatusBoardApp');
				success = false;
			}
			
			console.log('[LOG] main.js: ' + 
				(success ? '✅ loaded required modules' : '❌ ERROR could not load all required modules')
			);
		}
		
		//	run unit tests	--	move this to a Node file when ready to start deploying
		// RiverStatusBoardTests.runUnitTests();
		
		//	start the application
		RiverStatusBoardApp.start();
	}
);

// EOF
