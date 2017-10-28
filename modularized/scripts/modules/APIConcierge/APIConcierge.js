//
//	APIConcierge.js
//		An intervening layer that allows API clients and specific APIs to be managed separately and independently, so
//		that a change of API provider does not require a rewrite of the API user.
//
//		The user makes a request to the concierge, and the concierge uses its set of clients to fulfill it, according
//		to settings and caching managed by the user/admin
//
//		Example: To fetch the water temperature, the user makes such a request to the concierge. The concierge then
//		consults its settings and cache to determine (1) if it can service the request, (2) what API client to use, and
//		(3) if it has the requested data already cached within an expiration period.
//


define("APIConcierge", [], function() {
	var theModule = {};
	
	//	VCS & Copyright
	theModule.meta = {
		version: "0.0.1",
		author: "Maxwell B Garber <max.garber+dev#gmail.com>",
		date: "2017-10-28"
	};
	
	theModule.config = {
		usingMockData: false,
		usingHttpsOnly: true
	};
	
	theModule.maps = {};
	
	//	not sure how to make this useful yet
	theModule.maps.valueId_hierarchy = {
		water: {
			flow: 'waterFlow',
			temp: 'waterTemp',
			level: 'waterLevel'
		},
		air: {
			speed: 'airSpeed',
			temp: 'airTemp',
			dirxn: 'airDirxn'
		},
		sun: {
			rise: 'sunrise',
			set: 'sunset'
		}
	};
	
	/*
	//	for a given valueId, what is the apiClientId of the API client that will fetch it?
	theModule.maps.valueId_to_apiClientModule = {
		'waterFlow': gov_weather,
		'waterLevel': gov_weather,
		'waterTemp': gov_usgs,
		
		'airTemp': org_openweathermap,
		'airSpeed': org_openweathermap,
		'airDirxn': org_openweathermap,
		
		'sunrise': org_sunrise_sunset,
		'sunset': org_sunrise_sunset
	};
	
	//	for a given apiClientId, which API client module matches to it? 
	theModule.maps.apiClientId_to_apiClientModule = {
		'gov_weather': gov_weather,
		'usgs.gov': gov_usgs,
		'sunrise-sunset.org': org_sunrise-sunset,
		'openweather.org': org_openweathermap
	};
	*/
		
});