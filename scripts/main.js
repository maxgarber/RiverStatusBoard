//		RiverStatusBoard: Information for Rowers and Paddlers
//		Allegheny River information for Three Rivers Rowing Association (TRRA)
//		by Maxwell B Garber <max.garber+dev@gmail.com>
//		main.js created on 2017-06-26

//	make requirejs calls here


//	dev/debug stuff here
let devMode = false;

//	main block - declare before executing
let main = function () {
	var viewModel = new AppViewModel();
	var bindingContext = document.getElementById('koBindingContext');
	ko.applyBindings(viewModel, bindingContext);
	viewModel.init();
	
	//	set to update every 15 minutes
	window.autoRefresher = setInterval(function () {
		viewModel.update();
	}, 1000*60*15);
	
	window.vm = viewModel;
	
	if (viewModel.graphEnabled()) {
		setupGraphStructures();
		populateDataSets();
		renderGraph();
	}
};

//	call main once page has loaded
window.onload = function () {
	main();
	window.vm.update();
}
// EOF
