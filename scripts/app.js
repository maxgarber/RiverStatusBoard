//		RiverStatusBoard: Information for Rowers and Paddlers
//		Allegheny River information for Three Rivers Rowing Association (TRRA)
//		by Maxwell B Garber <max.garber+dev@gmail.com>
//		app.js created 207-06-27

var AppViewModel = function () {
	
	//	Dev/Debug properties
	this.devMode = true;
	this.graphEnabled = ko.observable(false);
	
	// static, private
	this._initString = ' ';
	
	this.referenceToAppViewModel = this;
	
	// @section Water: Flow, Level, Temperature
	this.waterFlow = ko.observable(this._initString);
	this.waterFlowUnits = ko.observable("kcfs");
	this.waterFlowColor = ko.computed(function () {
		var color = trra_safety.rowing.zoneColorForWaterFlow(this.waterFlow());
		return color;
	}, this);
	this.waterLevel = ko.observable(this._initString);
	this.waterLevelUnits = ko.observable("ft");
	this.waterTemp = ko.observable(this._initString);
	this.waterTempUnits = ko.observable("˚C");
	this.waterTempColor = ko.computed(function () {
		var color = trra_safety.rowing.zoneColorForWaterTemp(this.waterTemp());
		return color;
	}, this);
	this.waterTempF = ko.computed(function () {
		let tempC = this.waterTemp();
		var tempF = '';
		if (tempC != null && tempC != this._initString) {
			tempF = (tempC * (9/5)) + 32;
			tempF = tempF.toFixed(1);
		}
		return tempF;
	}, this);
	
	// @section Air: Wind, Temperature
	this.airPropertiesEnabled = ko.observable(false);
	this.airTemp = ko.observable(this._initString);
	this.airTempUnits = ko.observable("˚C");
	this.airSpeed = ko.observable(this._initString);
	this.airSpeedUnits = ko.observable("mph");
	this.airDirxn = ko.observable(this._initString);
	
	// @section Sun: Sunrise, Sunset
	this.sunrise = ko.observable(this._initString);
	this.sunset = ko.observable(this._initString);
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
	
	// @section Internal-Private
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
	
	// @section Zone
	this.zone = ko.computed(function () {
		var zone = this._initString;
		
		//	don't try to calculate until necessary values fetched
		if (this._readyToComputeZone()) {
			//	Declared in trra-safety.js
			zone = trra_safety.rowing.zoneForConditions(
				this.waterFlow(), this.waterTemp(),
				this.sunrise(), this.sunset()
			);
		}
		
		return zone;
	}, this);
	this.zoneColor = ko.computed(function () {
		var color = trra_safety.rowing.zoneColorForZone(this.zone());
		return color;
	}, this);
	
	this.zoneDisplay = ko.computed(function () {
		let zone = this.zone();
		if (zone > 6) {
			// show prohibited
			return 'X';
		} else {
			return zone;
		}
	}, this);
	
	// experimental
	this.safetyInfoForCategoryAndZone = function (category, zone) {
		let categoryEntry = trra_safety.rowing.matrix[category][zone];
		return categoryEntry;
	};
	
	// @section controlElements' functions
	this.toggleAttribution = function () {
		$('#attributionRow').slideToggle();
		let y = $('#attributionRow').position().top;
		window.scrollTo(0,y*1.1);
	};
	
	this.manualRefresh = function () {
		this.update();
		$("#refresh-button").rotate({
			angle:0,
			animateTo: 720,
			duration: 1500,
			easing: $.easing.easeInOutExpo
		});
	}
	
	// @section Safety Rules
	this.shellTypes = ko.computed(function () {
		let zone = this.zone();
		let shells = trra_safety.rowing.matrix.shellType[zone];
		return shells;
	}, this);
	this.launchRatio = ko.computed(function () {
		let zone = this.zone();
		let launchRatio = trra_safety.rowing.matrix.launchToShellRatio[zone];
		return launchRatio;
	}, this);
	this.coachCert = ko.computed(function () {
		let zone = this.zone();
		let coaches = trra_safety.rowing.matrix.coachCertification[zone];
		return coaches;
	}, this);
	this.pfdReq = ko.computed(function () {
		let zone = this.zone();
		let pfdR = trra_safety.rowing.matrix.pfdRequirement[zone];
		return pfdR;
	}, this);
	this.commsEquip = ko.computed(function () {
		let zone = this.zone();
		let comms = trra_safety.rowing.matrix.commRequirement[zone];
		return comms;
	}, this);
	this.crewSkill = ko.computed(function () {
		let zone = this.zone();
		return trra_safety.rowing.matrix.crewSkillLevel[zone];
	}, this);
	this.additionalSafety = ko.computed(function () {
		let zone = this.zone();
		return trra_safety.rowing.matrix.additionalSafetyItems[zone];
	}, this);
	
	// @section primary operation
	this.update = function () {
		
		//	Pattern: for given variable, invoke corresponding function declared in apiConceierge
		//	  …pass in the setter method (in this case the observable itself) so it can update it
		//	  …asynchronously when the API call returns
		
		apiConcierge.getValueAsync('waterFlow', this.waterFlow);
		apiConcierge.getValueAsync('waterLevel', this.waterLevel);
		apiConcierge.getValueAsync('waterTemp', this.waterTemp);
		// intervene for unit switching
		
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
