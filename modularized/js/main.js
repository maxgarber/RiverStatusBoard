//	RiverStatusBoard: Information for Rowers and Paddlers
//	Allegheny River information for Three Rivers Rowing Association (TRRA)
//	by Maxwell B Garber <max.garber+dev@gmail.com>
//	main.js created on 2017-06-26

//	RequireJS config
requirejs.config({
	paths: {
		jquery: 'libs/jquery-3.2.1.min', 
		moment: 'libs/moment-2.18.1.min',
		knockout: 'libs/knockout-3.4.2'
	}
});


var require_round2 = function ($, moment, ko) {
	
	console.log('are jQuery, moment, & knockout available in require_round2()?');
	console.log("jquery: " + ($ == jQuery) );
	console.log("moment: " + (moment != null) );
	console.log("knockout: " + (ko != null) );
	
	// require(['app'], function (app) {
	//
	// });
};


//	RequireJS round 1
require(
	// dependencies
	['jquery', 'moment', 'knockout'],
	// post-load block
	function($, moment, ko) {
		var jqueryLoaded = ($ != null && $ === jQuery);
		var momentLoaded = (moment != null);
		var knockoutLoaded = (ko != null);
		
		console.log("modules loaded:");
		console.log("\tjQuery: " + jqueryLoaded);
		console.log("\tmoment: " + momentLoaded);
		console.log("\tknockout: " + knockoutLoaded);
		require_round2($, moment, ko);
	}
);

//	main block - declare before executing
let main = function () {
	var viewModel = new AppViewModel();
	var bindingContext = document.getElementById('koBindingContext');
	ko.applyBindings(viewModel, bindingContext);
	window.vm = viewModel;
	viewModel.update();
};

//	call main once page has loaded
// window.onload = function () { main(); }

// EOF
