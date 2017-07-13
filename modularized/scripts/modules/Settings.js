//
//	RiverStatusBoard: Information for Rowers and Paddlers
//	Allegheny River information for Three Rivers Rowing Association (TRRA)
//	by Maxwell B Garber <max.garber+dev@gmail.com>
//	Settings.js created on 2017-07-05
//

define("Settings", [], function () {
	var theModule = {};
	theModule.meta = {
		//	VCS & Copyright
		version: "0.0.1",
		author: "Maxwell B Garber <max.garber+dev@gmail.com>",
		date: "2017-07-05"
	};
	
	theModule.ZoneColors = {
		0: '#999999',	// indeterminate
		1: '#008c00',
		2: '#7fff00',
		3: '#c8ff00',
		4: '#ffff00',
		5: '#ffc800',
		6: '#ff7f00',
		7: '#ff0000'	// not rowable at all 
	};
	
	
	return theModule;
});

// EOF
