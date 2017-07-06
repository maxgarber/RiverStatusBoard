//
//	RiverStatusBoard: Information for Rowers and Paddlers
//	Allegheny River information for Three Rivers Rowing Association (TRRA)
//	by Maxwell B Garber <max.garber+dev@gmail.com>
//	KOComponentViewModels.js created on 2017-07-04
//


//	list of components

// datum:  displays a single piece of information, e.g. the water flow rate
// 	- has a numerical value, units, and possibly a direction
// 	- has a ColorScale that it uses to determine its coloring
//
// jumbo:  displays a single bit of text very largely
// 	- has a ColorScale that it uses to determine its coloring
//
// advisory:  displays a single category safety rule
// 	- has a label
// 	- has an accompanying text block
//
// graph:  to be done much later


var datum = {
	viewModel: function (params) {
		
	},
	template: {
		require: 'text!./KOComponentTemplateHTML/datum.html'
	}
	
};


ko.components.register('datum', datum);