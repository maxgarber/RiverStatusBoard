//	
//		TRRA Dashboard
//		by Maxwell Garber <max.garber+dev@gmail.com>
//		constants.js
//		Global constants/reference values
//


//	DOM access ref
let selectors = {
	graphCanvas: 	'#graphCanvas',
	currentFlow: 	'#dataField-flow',
	currentFlood: 	'#dataField-flood',
	currentTemp: 	'#dataField-temp',
	currentZone: 	"#dataField-zone",
	currentBoats: 	"#dataField-boats",
	currentCoaches: "#dataField-coaches",
	currentEquipment: "#dataField-equipment",
	currentSkill: 	"#dataField-skill",
	currentNotes: 	"#dataField-notes"
};
let graphCanvasSelector = selectors.graphCanvas;


//	URIs & query parameters
let flowAndFloodSourceURI = "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=shrp1&output=xml";
let temperatureSourceURI = "https://waterservices.usgs.gov/nwis/iv/";

let flowAndFloodParameters = {
	gage: 'shrp1',
	output: 'xml'
};
let temperatureParameters = {
	format: 'waterml,2.0',
	sites: '03049640',
	startDT: '',		// literal example '2017-04-12T15:00-0000'
	endDT: '',			// literal example '2017-04-14T01:30-0000'
	parameterCd: '00010',
	siteStatus: 'all'
};

//	Display customization
let dataDownsampleFactor = 1;

let plotColors = {
	temperature: '#FF5050',
	flow: '#3377FF',
	flood: '#44EE44'
};

//	map zones to bootstrap label classnames
let zoneColors = {
	1: '#107e02',
	2: '#00dd00',
	3: '#fbff00',
	4: '#ffda00',
	5: '#ff9400',
	6: '#ff3b00',
	7: '#000000'
}

// EOF
