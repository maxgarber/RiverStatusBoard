//	Allegheny River Status: Information for Rowers and Paddlers
//	Maxwell B Garber <max.garber+dev@gmail.com>
//	v3.x.y	started on 2017-06-26, updated on YYYY-MM-DD
//	main.js created on 2017-06-26

//	app object
var AppViewModel = function () {
	
	this.waterFlow = ko.observable('–');
	this.waterLevel = ko.observable('–');
	this.waterTemp = ko.observable('–');
	this.airTemp = ko.observable('–');
	this.airSpeed = ko.observable('–');
	this.airDirxn = ko.observable('–');
	this.sunrise = ko.observable('–');
	this.sunset = ko.observable('–');
	
	this.update = function () {
		
		//	Pattern: for given variable, invoke corresponding function declared in conceierge
		//		pass in the setter method (in this case the observable itself) so it can update
		//		asynchronously when the API call returns
		
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
}
// EOF
