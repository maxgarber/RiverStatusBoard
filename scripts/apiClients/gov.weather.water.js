//		RiverStatusBoard: Information for Rowers and Paddlers
//		Allegheny River information for Three Rivers Rowing Association (TRRA)
//		by Maxwell B Garber <max.garber+dev@gmail.com>
//		gov.weather.js created on 2017-06-26
//		Patched to use NOAA's NWPS instead of AHPS on 2024-05-25

var gov_weather_water = {
	
	cache: {
		data: null,
		timestamp: null,
		agelimit: null
	},
	
	api: {
		url: 'https://water.weather.gov/ahps2/hydrograph_to_xml.php',
		params: {
			gage: 'shrp1',
			output: 'xml'		// switch to JSON? -- unsupported yet
		}
	},
	
	// helper functions
	unitsFormatter: function (measure, units_i) {
		return units_i;
	},
	
	valueFormatter: function (measure, value_i) {
		return value_i;
	},
	
	// api functions
	getWaterFlow: function (setterFunc) {
		//	1: check if we have data already
		if (gov_weather_water.cache.data != null) {
			//	2: if the timestamp is acceptably recent, use it
			if ( (now - cache.timestamp) < agelimit ){
				let value = cache.data.THEVALUE;			//TODO: replace with real value
				setterFunc(value);
				return;
			}
		}
		
		let asyncContext = gov_weather_water;
		
		async function getCurrentWaterData() {
			let baseURL = "https://api.water.noaa.gov/nwps/v1";
			let requestURL = baseURL + '/gauges/SHRP1';
			let response = await fetch(requestURL);
			let data = response.json();
			return data;
		}
		
		getCurrentWaterData().then((data) => {
			setterFunc(data.status.observed.secondary);
		});
		
	},//end-getWaterFlow
	
	getWaterLevel: function (setterFunc) {
		
		//	1: check if we have data already
		if (gov_weather_water.cache.data != null) {
			//	2: if the timestamp is acceptably recent, use it
			if ( (now - cache.timestamp) < agelimit ){
				let value = cache.data.THEVALUE;			//TODO: replace with real value
				setterFunc(value);
				return;
			}
		}
		
		let asyncContext = gov_weather_water;
		
		async function getCurrentWaterData() {
			let baseURL = "https://api.water.noaa.gov/nwps/v1";
			let requestURL = baseURL + '/gauges/SHRP1';
			let response = await fetch(requestURL);
			let data = response.json();
			return data;
		}
		
		getCurrentWaterData().then((data) => {
			setterFunc(data.status.observed.primary);
		});
		
	},//end-getWaterLevel
	
};

// EOF
