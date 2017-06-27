//	
//		TRRA Dashboard
//		by Maxwell Garber <max.garber+dev@gmail.com>
//		omnibus.js
//

// require(['jquery']);
// require(['moment']);


//
//	Global Constants
//

let flowAndFloodSourceURI = "https://water.weather.gov/ahps2/hydrograph_to_xml.php?gage=shrp1&output=xml";
let temperatureSourceURI = "https://waterservices.usgs.gov/nwis/iv/";
let flowAndFloodParameters = { gage:'shrp1', output:'xml' };
let temperatureParameters = { 
	format:'waterml,2.0', sites:'03049640', startDT:'', endDT:'', parameterCd:'00010', siteStatus:'all'
};
let plotColors = { temperature: '#FF5050', flow: '#3377FF', flood: '#44EE44' };

let flowZoneLimits = [ 28, 35, 40, 45, 50, 60 ];		// in kcfs
let floodZoneLimits = [ 1, 2, 5, 10, 15, 20 ];			// in ft
let waterTempLimits = [ 4.5, 10 ];						// in ˚C
let airTempLimits = [ -5, 0, 5, 15, 20, 30 ];			// in ˚C

let zoneColors = { 1:'#00dd00', 2:'##BFFF00', 3:'#edd00', 4:'#ffd000', 5:'#ffa800', 6:'#ff5800', 7:'#ff0000' };

let fieldSelectors = [
	"#dataField-flow",
	"#dataField-flood",
	"#dataField-temp",
	"#dataField-air",
	"#dataField-windSpeed",
	"#dataField-windDirxn",
	"#dataField-zone",
	"#dataField-boats",
	"#dataField-coaches",
	"#dataField-equipment",
	"#dataField-skill",
];

//
//	Functions
//

var toFahrenheit = function (temp) {
	return ( (temp!=null) ? ((temp * (9/5)) + 32) : null );
};

var toCelsius = function (temp) {
	return ( (temp!=null) ? ((temp - 32) * (5/9)) : null );
};

//	zone-finding
//	TODO: make this handle >,≥,<,≤ fully -- this will move you down a zone if you're exactly on the demarcation
var rank = function (value, scale) {
	var rank = -1;
	var n = scale.length;
	for(i = 0; i < n; i++) {
		if (value >= scale[i]) {
			rank = i+1;
		}
	}
	if (value >= scale[scale.length-1]) {
	  rank = scale.length;
	}
	return rank;
};

var clearDataFields = function () {
	for(i=0; i<fieldSelectors.length; i++) {
		$(fieldSelectors[i]).text(" ");
	}
};

var displayMockData = function () {
	clearDataFields();
	$('#dataField-flow').text("15.3 kcfs");
	$('#dataField-flood').text("5 ft");
	$('#dataField-temp').text("20.5 ˚C");
	$('#dataField-air').text("27 ˚C");
	$('#dataField-windSpeed').text("3 mph");
	$('#dataField-windDirxn').text("SE");
	$('#dataField-zone').text("1");
	$("#dataField-boats").text("All");
	$("#dataField-coaches").text("Not a requirement");
	$("#dataField-equipment").html("optional: PFD<br />recommended: protected cellphone");
	$("#dataField-skill").text("All levels");
};


var getRiverData = function (riverDataObject) {
	riverDataObject = {
		flow: { units:'kcfs', latestValue:'', abscissae:[], ordinates:[] },
		flood: { units:'ft', latestValue:'', abscissae:[], ordinates:[] },
		temp: { units:'˚C', latestValue:'', abscissae:[], ordinates:[] },
		zone: 0
	};
	$.ajax({
		url:flowAndFloodSourceURI, data:flowAndFloodParameters, datatype:'xml',
		success: function (data, textStatus, jqXHR) {
			var latestObservedDatum = $(data).find('observed > datum:first');
			riverDataObject.flow.units = $(latestObservedDatum).find('secondary').attr('units');
			riverDataObject.flow.latestValue = $(latestObservedDatum).find('secondary').text();
			riverDataObject.flood.units = $(latestObservedDatum).find('primary').attr('units');
			riverDataObject.flood.latestValue = $(latestObservedDatum).find('primary').text();
			var observedData = $(data).find('site > observed > datum');
			var observedDataN = observedData.length;
			
			for(i = 0; i < observedDataN; i += 1) {
				var datum = $(observedData).get(i);
				var datetime = $(datum).children('valid').text();
				datetime = moment(datetime.substr(0,16));
				var flood = Number.parseFloat( $(datum).children('primary').text() );
				var flow = Number.parseFloat( $(datum).children('secondary').text() );
				riverDataObject.flow.abscissae[i] = datetime;
				riverDataObject.flood.abscissae[i] = datetime;
				riverDataObject.flow.ordinates[i] = flow
				riverDataObject.flood.ordinates[i] = flood
			}
			
			// need to set temperatureParameters' startDT and endDT here
			var obsmin = moment.min(riverDataObject.flow.abscissae);
			var obsmax = moment.max(riverDataObject.flow.abscissae);
			var tempReqFormat = "YYYY-MM-DDTHH:mm-0000";
			temperatureParameters.startDT = obsmin.format(tempReqFormat);
			temperatureParameters.endDT = obsmax.format(tempReqFormat);
			
			let flowZone = rank(flow, flowZoneLimits);
			let flowZoneColor = zoneColors[flowZone];
			$('#dataField-flow').text( "" + riverDataObject.flow.latestValue + " " + riverDataObject.flow.units );
			$('#dataField-flow').css('background-color', flowZoneColor);
			
			let floodZone = rank(flood, floodZoneLimits);
			let floodZoneColor = zoneColors[floodZone];
			$('#dataField-flood').text( "" + riverDataObject.flood.latestValue + " " + riverDataObject.flood.units );
			$('#dataField-flood').css('background-color', floodZoneColor);
			
			riverDataObject.zone = flowZone;
		},
		complete: function (textStatus, jqXHR) {
			$.ajax({
				url:temperatureSourceURI, data:temperatureParameters, datatype:'xml',
				success: function (data, textStatus, jqXHR) {
					var temp = $(data.documentElement).children().find('wml2\\:value:first').text();
					riverDataObject.temp.latestValue = temp;
					var observedData = $(data.documentElement).children('wml2\\:observationMember').find('wml2\\:point')
					var observedDataN = observedData.length;
					for(i = 0; i < observedDataN; i += 1) {
						var datum = $(observedData).get(i);
						var datetime = $(datum).find('wml2\\:time').text();
						var temp = $(datum).find('wml2\\:value').text();
						var theMoment = moment( datetime.substr(0,16) );
						riverDataObject.temp.abscissae[i] = theMoment;
						riverDataObject.temp.ordinates[i] = Number.parseFloat(temp);
					}
					$('#dataField-temp').text(""+temp+" "+riverDataObject.temp.units);
					let tempRank = rank(temp, waterTempLimits);
					var tempZone = -1;
					if (tempRank == -1) {
						tempZone = 4;
					} else if (tempRank == 1) {
						tempZone = 3;
					} else if (tempRank == 2) {
						tempZone = 1;
					}
					if (tempZone > 0) {
						let tempZoneColor = zoneColors[tempZone];
						$('#dataField-temp').css('background-color', tempZoneColor);
						riverDataObject.zone = Math.max(riverDataObject.zone, tempZone);
					}
					let zoneColor = zoneColors[riverDataObject.zone];
					$('#dataField-zone').css('background-color', zoneColor);
				}
			});
		}
	});
	return riverDataObject;
};

//
//	main-esque
//

window.onload = function () {
	displayMockData();
	var riverData;
	riverData = getRiverData(riverData);
}