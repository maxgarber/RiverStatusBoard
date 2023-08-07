//		RiverStatusBoard: Information for Rowers and Paddlers
//		Allegheny River information for Three Rivers Rowing Association (TRRA)
//		by Maxwell B Garber <max.garber+dev@gmail.com>
//		gov.usgs.js created on 2017-06-26


var gov_usgs = {
	
	cache: {
		data: null,
		timestamp: null,
		agelimit: null
	},
	
	api: {
		url: 'https://waterservices.usgs.gov/nwis/iv',
		params: {
			format: 'json',			// 'waterml,2.0' is old style
			sites: '04231600',//'04230650',//TODO, changeme
			parameterCd: '00010',
			siteStatus: 'all'/*,
			startDT: '',			// need to restore for timeseries fetch
			endDT: '' */
		}
	},
	
	//	helper functions
	unitsFormatter: function (unit_i) {
		return "˚C";
	},
	
	valueFormatter: function (value_i) {
		return value_i;
	},
	
	//	api functions
	getWaterTemp: function (setterFunc) {
		//	1: check if we have data already
		if (gov_usgs.cache.data != null) {
			//	2: if the timestamp is acceptably recent, use it
			if ( (now - cache.timestamp) < agelimit ){
				let value = cache.data.THEVALUE;			//TODO: replace with real value
				setterFunc(value);
				return;
			}
		}
		
		let asyncContext = gov_usgs;
		
		$.ajax({
			url: asyncContext.api.url, 
			data: asyncContext.api.params, 
			datatype: asyncContext.api.params.format,
			success: function (data, textStatus, jqXHR) {
				var value = data.value.timeSeries[0].values[0].value[0].value;
				value = asyncContext.valueFormatter(value);
				
				var units = data.value.timeSeries[0].variable.unit.unitCode;
				units = asyncContext.unitsFormatter(units);
				
				let apiData = "" + value /*+ " " + units*/;
				
				// TODO: update the cached data
				setterFunc(apiData);
			}//end-success
		});//end-$.ajax
	}//end-getWaterTemp
	
};

// EOF
