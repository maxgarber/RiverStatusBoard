//	
//		TRRA Dashboard
//		by Maxwell Garber <max.garber+dev@gmail.com>
//		main.js
//

//
//	Utility Functions
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
	$('#dataField-flow').text(" ");
	$('#dataField-flood').text(" ");
	$('#dataField-temp').text(" ");
	$('#dataField-air').text(" ");
	$('#dataField-windSpeed').text(" ");
	$('#dataField-windDirxn').text(" ");
	$('#dataField-zone').text("–");
	$("#dataField-boats").text(" ");
	$("#dataField-coaches").text(" ");
	$("#dataField-equipment").text(" ");
	$("#dataField-skill").text(" ");
};

var displayMockData = function () {
	clearDataFields();
	$('#dataField-flow').text("15.3 kcfs");
	$('#dataField-flood').text("5 ft");
	$('#dataField-temp').text("22.5 ˚C");
	$('#dataField-air').text("27 ˚C");
	$('#dataField-windSpeed').text("3 mph");
	$('#dataField-windDirxn').text("SE");
	$('#dataField-zone').text("1");
	$("#dataField-boats").text("All");
	$("#dataField-coaches").text("Not a requirement");
	$("#dataField-equipment").html("optional: PFD<br />recommended: protected cellphone");
	$("#dataField-skill").text("All levels");
};


//
//	Main-esque block
//
var riverFlow = -1 , riverTemp = -1 , riverFlood= -1 , airTemp= -1 , windSpeed= -1 , windDirxn= -1;

window.onload = function () {
	setupGraphStructures();
	clearDataFields();
	
	let riverData = getRiverData();
	let airData = getAirData();
	
	$.ajax({
		url: flowAndFloodSourceURI,
		data: flowAndFloodParameters,
		datatype: 'xml',
		success: function (data) {
			
			parseFlowAndFloodData(data);
			
			$.ajax({
				url: temperatureSourceURI,
				data: temperatureParameters,
				datatype: 'xml',
				success: function (data) {
					
					parseTemperatureData(data);
					colorizeDataFields();
					
				}
			});
		}
	});
};

// EOF
