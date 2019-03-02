//
//	new_graph.js
//
//	requirements: 
//		$ = jQuery
//		moment = Moment
//

//
//	§1: Data
//

//	Data sources and stores
const WaterFlowAndFloodDataSource = {
	url: "https://water.weather.gov/ahps2/hydrograph_to_xml.php",
	args: {
		gage:			'shrp1',
		output:			'xml',
		time_zone:		'edt'
	}
};

const WaterTemperatureDataSource = {
	url: "https://waterservices.usgs.gov/nwis/iv/",
	args: {
		format:			'waterml,2.0',
		sites:			'03049640',
		parameterCd:	'00010',
		siteStatus:		'all'
	}
};

let GlobalDataStore = {
	WaterFlow: { data: [] },
	WaterFlood: { data: [] },
	WaterTemp: { data: [] }
};

//	Parsers
function WaterFlowAndFloodDataParser (data) {
	let ObservedData = $(data).find('site > observed > datum');
	let ForecastData = $(data).find('site > forecast > datum');
	
	for(var i = 0; i < ObservedData.length; i++) {
		let datum = $(ObservedData).get(i);
		let mTime = moment( $(datum).children('valid').text() );
		let fFlow = Number.parseFloat( $(datum).children('secondary').text() );
		let fFlood = Number.parseFloat( $(datum).children('primary').text() );
		
		GlobalDataStore.WaterFlow.data.push({ time: mTime, value: fFlow });
		GlobalDataStore.WaterFlood.data.push({ time: mTime, value: fFlood });
	}
}

function WaterTemperatureDataParser (data) {
	let ObservedData = $(data.documentElement).children('wml2\\:observationMember').find('wml2\\:point');
	
	for(var i = 0; i < ObservedData.length; i++) {
		let datum = $(ObservedData).get(i);
		let mTime = moment( $(datum).find('wml2\\:time').text() );
		let fTemp = Number.parseFloat( $(datum).find('wml2\\:value').text() );
		
		GlobalDataStore.WaterTemp.data.push({ time: mTime, value: fTemp });
	}
}


//	Fetches
function GetWaterData() {
	// Flow and Flood
	$.ajax({
		url: WaterFlowAndFloodDataSource.url,
		data: WaterFlowAndFloodDataSource.args,
		dataType: WaterFlowAndFloodDataSource.args.output,
		success: WaterFlowAndFloodDataParser
	});
	
	// Temperature
	$.ajax({
		url: WaterTemperatureDataSource.url,
		data: WaterTemperatureDataSource.args,
		dataType: 'xml',
		success: WaterTemperatureDataParser
	});
}


//
//	§2: Graphing
//

const GraphCanvasSelector = "#graphCanvas";

let timeAxis = {
	id: 'timeAxis',
	display: true,
	weight: 0,
	type: 'linear',
	position: 'bottom',
	offset: false,
	// gridLines: {},
	scaleLabel: {
		display: true,
		labelString: 'Time',
		lineHeight: 1.2,
		fontColor: '#666',
		fontFamily: 'sans-serif',
		fontSize: 12
		fontStyle: 'normal',
		padding: 4
	},
	ticks: {
		beginAtZero: false,
		min: /*MIN*/,
		max: /*MAX*/,
		maxTicksLimit: /*NUM*/,
		precision: ,
		stepSize: ,
		suggestedMax: ,
		suggestedMin: ,
		callback: function (value, index, values) {}
	}
};

let flowAxis = {};
let floodAxis = {};