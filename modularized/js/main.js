//		RiverStatusBoard: Information for Rowers and Paddlers
//		Allegheny River information for Three Rivers Rowing Association (TRRA)
//		by Maxwell B Garber <max.garber+dev@gmail.com>
//		main.js created on 2017-06-26

//	make requirejs calls here

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
