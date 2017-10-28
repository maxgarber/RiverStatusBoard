//
//	RiverStatusBoard: Information for Rowers and Paddlers
//	Allegheny River information for Three Rivers Rowing Association (TRRA)
//	by Maxwell B Garber <max.garber+dev@gmail.com>
//	main.js created on 2017-06-26
//


//	Globally-accessible configuration parameters
var globalConfiguration = {
	debugMode: true,
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
		
		//	Who would a '2nd party' be?
		
		//	Modules -- 1st party scripts
		APIConcierge: 'modules/APIConcierge/APIConcierge',
		MathRanges: 'modules/MathRanges',
		TRRASafetyMatrix: 'modules/TRRASafetyMatrix',
		ColorScales: 'modules/ColorScales',
		Utilities: 'modules/Utilities',
		
		//	Settings/Configuration
		Settings: 'modules/Settings',
		
		//	Unit tests & application object
		RiverStatusBoardTests: 'RiverStatusBoardTests',
		RiverStatusBoardApp: 'RiverStatusBoardApp'
	}
});

//	General-purpose utility to validate & log success of loading of a module
var checkModuleLoaded = function (moduleHandle, moduleIdentifier_string, moduleLoadedCheck_func) {
	if (moduleHandle != null) {
		if (moduleLoadedCheck_func()) {
			console.log('[LOG] main.js: ✅ loaded ' + moduleIdentifier_string + ' successfully');
		} else {
			console.log('[LOG] main.js: ❌ ERROR could not load ' + moduleIdentifier_string);
		}
	} else {
		console.log('[LOG] main.js: ❌ ERROR could not load ' + moduleIdentifier_string);
	}
}

//	RequireJS module loading & synchronous application start
require([
		'jquery', 'knockout', 'moment',
		'APIConcierge', 'MathRanges', 'TRRASafetyMatrix', 'ColorScales', 'Utilities',
		'Settings', 'RiverStatusBoardTests', 'RiverStatusBoardApp'
	], function (
		$, ko, moment, 
		APIConcierge, MathRanges, TRRASafetyMatrix, ColorScales, Utilities,
		Settings, RiverStatusBoardTests, RiverStatusBoardApp
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
			// check successful loading of each module
			var success = true;
			success &= checkModuleLoaded($, 'jQuery', function () {
				return ($ == jQuery);
			});
			
			success &= checkModuleLoaded(ko, 'Knockout', function () {
				return (typeof ko.observable == 'function');
			});
			
			success &= checkModuleLoaded(moment, "Moment", function () {
				return true;
			});
			
			success &= checkModuleLoaded(APIConcierge, "APIConcierge", function () {
				return (APIConcierge.meta.version != "");
			});
			
			success &= checkModuleLoaded(MathRanges, "MathRanges", function () {
				return (MathRanges.meta.version !== "");
			});
			
			success &= checkModuleLoaded(TRRASafetyMatrix, "TRRASafetymatrix", function () {
				return (TRRASafetyMatrix.meta.version != "");
			});
			
			success &= checkModuleLoaded(ColorScales, "ColorScales", function () {
				return (ColorScales.meta.version != "");
			});
			
			success &= checkModuleLoaded(Utilities, "Utilities", function () {
				return (Utilities.meta.version != "");
			});
			
			//																							//
			//——————————————————————————————————————————————————————————————————————————————————————————//
			//																							//
			
			success &= checkModuleLoaded(Settings, "Settings", function () {
				return (Settings.meta.version != "");
			});
			
			success &= checkModuleLoaded(RiverStatusBoardTests, "RiverStatusBoardTests", function () {
				return (RiverStatusBoardTests.meta.version != "");
			});
			
			success &= checkModuleLoaded(RiverStatusBoardApp, "RiverStatusBoardApp", function () {
				return (RiverStatusBoardApp.meta.version != "");
			});
			
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
