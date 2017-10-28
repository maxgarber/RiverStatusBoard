//
//	debugUtils.js
//	Debugging Utilities
//

//	variables & structures
var debug_settings = {
	level: 5,
	enabled: true,
	preamble: '[LOG]:'
};

//	ancillary functions
var checkModuleLoaded = function (moduleHandle, moduleName, checkFunc) {
	if (moduleHandle != null) {
		if (checkFunc()) {
			return true;
		}
	}
	// what to do with moduleName?
	return false;
}

//	wrappers
var debug_tools = {
	// function hooks
};

var debug_utils = {
	settings: debug_settings,
	tools: debug_tools
};

var setupDebuggingUtilities = function (theWindow) {
	theWindow.debugUtils = debug_utils;
	console.log(settings.preamble + 'Debugging Utilities successfully attached');
};

// EOF