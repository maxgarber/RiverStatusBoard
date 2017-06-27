//		RiverStatusBoard: Information for Rowers and Paddlers
//		Allegheny River information for Three Rivers Rowing Association (TRRA)
//		by Maxwell B Garber <max.garber+dev@gmail.com>
//		apiConcierge.js created on 2017-06-26

/*
var usingMockData = false;

var mockData = {
	waterFlow: 32.9,
	waterTemp: 21.3,
	waterLevel: 12.9,
	airTemp: 22.4,
	airSpeed: 2.7,
	airDirxn: 227,
	sunrise: null,
	sunset: null
};

var apiClients = {
	'weather.gov': gov_weather,
	'usgs.gov': gov_usgs,
	'openweather.org': org_openweathermap,
	'sunrise-sunset.org': org_sunrise_sunset
};

var getWaterFlow = function (setterFunc) {
	if (usingMockData) { return mockData.waterFlow; }
	return apiClients['weather.gov'].getWaterFlow(setterFunc);
};

var getWaterLevel = function (setterFunc) {
	if (usingMockData) { return mockData.waterLevel; }
	return apiClients['weather.gov'].getWaterLevel(setterFunc);
};

var getWaterTemp = function (setterFunc) {
	if (usingMockData) { return mockData.waterTemp; }
	return apiClients['usgs.gov'].getWaterTemp(setterFunc);
};

var getAirTemp = function (setterFunc) {
	if (usingMockData) { return mockData.airTemp; }
	return apiClients['openweather.org'].getAirTemp(setterFunc);
};

var getAirSpeed = function (setterFunc) {
	if (usingMockData) { return mockData.airSpeed; }
	return apiClients['openweather.org'].getAirSpeed(setterFunc);
};

var getAirDirxn = function (setterFunc) {
	if (usingMockData) { return mockData.airDirxn; }
	return apiClients['openweather.org'].getAirDirxn(setterFunc);
};

var getSunrise = function (setterFunc) {
	if (usingMockData) { return mockData.sunrise; }
	return apiClients['sunrise-sunset.org'].getSunrise(setterFunc);
};

var getSunset = function (setterFunc) {
	if (usingMockData) { return mockData.sunset; }
	return apiClients['sunrise-sunset.org'].getSunset(setterFunc);
};
*/

//	Object-Based Version

var apiConcierge = {
	
	// skip AJAX requests
	usingMockData: false,
	
	// https-only, i.e. omit openweather requests that violate CSP
	usingHttpsOnly: true,
	
	// for an API domain, which apiClient
	clientMap: {
		'weather.gov': gov_weather,
		'usgs.gov': gov_usgs,
		'openweather.org': org_openweathermap,
		'sunrise-sunset.org': org_sunrise_sunset
	},
	
	// for a value, which API domain
	accessorMap: {
		'waterFlow': gov_weather.getWaterFlow,
		'waterLevel': gov_weather.getWaterLevel,
		'waterTemp': gov_usgs.getWaterTemp,
		'airTemp': org_openweathermap.getAirTemp,
		'airSpeed': org_openweathermap.getAirSpeed,
		'airDirxn': org_openweathermap.getAirDirxn,
		'sunrise': org_sunrise_sunset.getSunrise,
		'sunset': org_sunrise_sunset.getSunset
	},
	
	///	getValueAsync
	/// @param valueID: a unique identifier (string or int) of the value sought
	/// @param setterFunc: the function to be used to set the value once retrieved
	getValueAsync: function (valueId, setterFunc) {
		if (this.usingMockData) {				// if using mock data, short circuit
			 return mockData[valueId];
		}
		var getter = this.accessorMap[valueId];
		getter(setterFunc);
	}
	
};

// EOF
