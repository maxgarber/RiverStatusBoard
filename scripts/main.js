//		RiverStatusBoard: Information for Rowers and Paddlers
//		Allegheny River information for Three Rivers Rowing Association (TRRA)
//		by Maxwell B Garber <max.garber+dev@gmail.com>
//		main.js created on 2017-06-26


//	app object
var AppViewModel = function () {
	
	this._initString = ' ';
	
	this.waterFlow = ko.observable(this._initString);
	this.waterFlowUnits = ko.observable("kcfs");
	this.waterLevel = ko.observable(this._initString);
	this.waterLevelUnits = ko.observable("ft");
	this.waterTemp = ko.observable(this._initString);
	this.waterTempUnits = ko.observable("˚C");
	this.airTemp = ko.observable(this._initString);
	this.airTempUnits = ko.observable("˚C");
	this.airSpeed = ko.observable(this._initString);
	this.airSpeedUnits = ko.observable("mph");
	this.airDirxn = ko.observable(this._initString);
	this.sunrise = ko.observable(this._initString);
	this.sunset = ko.observable(this._initString);
	
	this._updated = ko.computed(function () {
		var updated = true;
		updated = updated && !(this.waterFlow() == this._initString);
		updated = updated && !(this.waterLevel() == this._initString);
		updated = updated && !(this.waterTemp() == this._initString);
		updated = updated && !(this.airTemp() == this._initString);
		updated = updated && !(this.airSpeed() == this._initString);
		updated = updated && !(this.airDirxn() == this._initString);
		updated = updated && !(this.sunrise() == this._initString);
		updated = updated && !(this.sunset() == this._initString);
		return updated;
	}, this);
	
	this.zone = ko.computed(function () {
		var zone = this._initString;
		
		//	don't try to calculate until all values fetched
		if (this._updated()) {
			//	Declared in trra-safety.js
			zone = trra_safety.rowing.zoneForConditions(this.waterFlow(), this.waterTemp(), this.sunrise(), this.sunset());
		}
		
		return zone;
	}, this);
	
	this.update = function () {
		
		//	Pattern: for given variable, invoke corresponding function declared in conceierge
		//		pass in the setter method (in this case the observable itself) so it can update
		//		asynchronously when the API call returns
		
		//	These functions are all defined/routed in apiConcierge.js
		//		but we lack a namespace container here
		
		getWaterFlow(this.waterFlow);		
		getWaterLevel(this.waterLevel);
		getWaterTemp(this.waterTemp);
		getAirTemp(this.airTemp);
		getAirSpeed(this.airSpeed);
		getAirDirxn(this.airDirxn);
		getSunrise(this.sunrise);
		getSunset(this.sunset);
		
		return true;
	};
};

//	main block - declare before executing
let main = function () {
	var viewModel = new AppViewModel();
	var bindingContext = document.getElementById('koBindingContext');
	ko.applyBindings(viewModel, bindingContext);
	window.vm = viewModel;
};

//	call main once page has loaded
window.onload = function () {
	main();
	window.vm.update();
}
// EOF
