//		RiverStatusBoard: Information for Rowers and Paddlers
//		Allegheny River information for Three Rivers Rowing Association (TRRA)
//		by Maxwell B Garber <max.garber+dev@gmail.com>
//		app.js created 207-06-27


var AppViewModel = function () {
	// static, private
	this._initString = ' ';
	
	// observable, public
	this.waterFlow = ko.observable(this._initString);
	this.waterFlowUnits = ko.observable("kcfs");
	
	this.waterLevel = ko.observable(this._initString);
	this.waterLevelUnits = ko.observable("ft");
	
	this.waterTemp = ko.observable(this._initString);
	this.waterTempUnits = ko.observable("˚C");
	
	//	openweathermap-based; conditionally disabled until CSP problem resolved
	this.airPropertiesEnabled = ko.observable(false);
	if (this.airPropertiesEnabled()) {
		this.airTemp = ko.observable(this._initString);
		this.airTempUnits = ko.observable("˚C");
		this.airSpeed = ko.observable(this._initString);
		this.airSpeedUnits = ko.observable("mph");
		this.airDirxn = ko.observable(this._initString);
	}
	
	//	these will be moment objects
	this.sunrise = ko.observable(this._initString);
	this.sunset = ko.observable(this._initString);
	//	these will be the text displays
	this.sunriseText = ko.computed(function () {
		if (this.sunrise() != this._initString) {
			return this.sunrise().format('h:mm a');
		} else {
			return this._initString;
		}
	}, this);
	this.sunsetText = ko.computed(function () {
		if (this.sunset() != this._initString) {
			return this.sunset().format('h:mm a');
		} else {
			return this._initString;
		}
	}, this);
	
	// computed, private
	this._updated = ko.computed(function () {
		var updated = true;
		updated = updated && !(this.waterFlow() == this._initString);
		updated = updated && !(this.waterLevel() == this._initString);
		updated = updated && !(this.waterTemp() == this._initString);
		if (this.airPropertiesEnabled()) {
			updated = updated && !(this.airTemp() == this._initString);
			updated = updated && !(this.airSpeed() == this._initString);
			updated = updated && !(this.airDirxn() == this._initString);
		}
		updated = updated && !(this.sunrise() == this._initString);
		updated = updated && !(this.sunset() == this._initString);
		return updated;
	}, this);
	
	this._readyToComputeZone = ko.computed(function () {
		var ready = true;
		ready = ready && !(this.waterFlow() == this._initString);
		ready = ready && !(this.waterTemp() == this._initString);
		ready = ready && !(this.sunrise() == this._initString);
		ready = ready && !(this.sunset() == this._initString);
		return ready;
	}, this);
	
	// computed, public
	this.zone = ko.computed(function () {
		var zone = this._initString;
		
		//	don't try to calculate until necessary values fetched
		if (this._readyToComputeZone()) {
			//	Declared in trra-safety.js
			zone = trra_safety.rowing.zoneForConditions(this.waterFlow(), this.waterTemp(), this.sunrise(), this.sunset());
		}
		
		return zone;
	}, this);
	
	// methods, public
	this.update = function () {
		
		//	Pattern: for given variable, invoke corresponding function declared in apiConceierge
		//	  …pass in the setter method (in this case the observable itself) so it can update it
		//	  …asynchronously when the API call returns
		
		apiConcierge.getValueAsync('waterFlow', this.waterFlow);
		apiConcierge.getValueAsync('waterLevel', this.waterLevel);
		apiConcierge.getValueAsync('waterTemp', this.waterTemp);
		
		//	Air temp & wind are disabled b/c OpenWeatherMap doesn't support HTTPS and I don't know
		//	  …how to modify the content security policy to allow mixed resource use
		// getAirTemp(this.airTemp);
		// getAirSpeed(this.airSpeed);
		// getAirDirxn(this.airDirxn);
		
		apiConcierge.getValueAsync('sunrise', this.sunrise);
		apiConcierge.getValueAsync('sunset', this.sunset);
		
		return true;
	};
};

// EOF
