//	Utilities.js


define("Utilities", [], function () {
	
	//	VCS & Copyright
	var theModule = {}
	theModule.meta = {
		version: "0.0.1",
		author: "Maxwell B Garber <max.garber+dev@gmail.com>",
		date: "2017-07-01"
	};
	
	//	Constants & Reference Values
	theModule.Constants = {
		ParentModule: theModule,
		
		zeroCinKelvin: 273.15,
		π: 3.1415926536,
		e: 2.7182818285
	};
	
	//	Temperature Functions
	theModule.Temperatures = {
		ParentModule: theModule,
		
		CelsiusToFahrenheit: function (degC) {
			return ( (degC != null) ? ((degC * (9/5)) + 32) : null );
		},
		
		FahrenheitToCelsius: function (degF) {
			return ( (degF != null) ? ((degF - 32) * (5/9)) : null );
		},
		
		KelvinToCelsius: function (tK) {
			return ( (tK != null) ? (tK - this.ParentModule.Constants.zeroCinKelvin) : null );
		}
	};
	
	return theModule;
});

// EOF