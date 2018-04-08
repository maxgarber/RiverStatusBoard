//		RiverStatusBoard: Information for Rowers and Paddlers
//		Allegheny River information for Three Rivers Rowing Association (TRRA)
//		by Maxwell B Garber <max.garber+dev@gmail.com>
//		trra-safety.js created on 2017-06-26


//	utility functions

//	rank returns the zone for a value, given a scale
//	TODO: add parameters for L/R inclusivity -- and/or make interval dependent
let rank = function (value, scale) {
	var r = 0;	// initialize at invalid/below all zones
	for (z = 1; z <= scale.zoneCount; z++) {
		if ( value >= scale[z].min && value <= scale[z].max ) {
			r = z;
			break;
		}
	}
	if (value > scale.absMax) {
		//	if we're beyond all defined zones
		r = scale.zoneCount + 1;
	}
	return r;
};

//	determines if it is currently daylight
let daylight = function (sunrise, sunset) {
	// check if sunruse, sunset are moment objects?
};

let semanticColors = {
	1: '#00c020',		//	green
	2: '#40fe00',		//	bright green
	3: '#c8ff00',		//	yellow
	4: '#ffff00',		//	orange-yellow
	5: '#ffa800',		//	orange
	6: '#ff0000',		//	red
	7: '#000000'		//	black 
};

var trra_safety = {
	
	//	utility functions
	
	//	rank returns the zone for a value, given a scale
	//	TODO: add parameters for L/R inclusivity -- and/or make interval dependent
	rank: function (value, scale) {
		var r = 0;	// initialize at invalid/below all zones
		for (z = 1; z <= scale.zoneCount; z++) {
			if ( value >= scale[z].min && value <= scale[z].max ) {
				r = z;
				break;
			}
		}
		if (value > scale[scale.zoneCount].max) {
			//	if we're beyond all defined zones
			r = scale.zoneCount + 1;
		}
		return r;
	},
	
	//	determines if it is currently daylight
	daylight: function (sunrise, sunset) {
		// check if sunruse, sunset are moment objects?
	},
	
	//	fixed-oarlock craft
	rowing: {
		//	scales define zone ranges for condition parameters in ascending order
		scales: {
			
			waterTemp: {
				zoneCount: 4,
				// in ˚C
				1: { min: 10.0, max: 50.0 },
				2: { min: 10.0, max: 50.0 },		// repeating 1 b/c it will break rank() o/w
				3: { min: 4.5, max: 10.0 },
				4: { min: -20.0, max: 4.5},
				// absolute limits not defined in safety matrix
				//	but you'd be insane to row when it's >100˚F or < 0˚F
				absMin: -20.0,
				absMax: 50.0
			},
		
			waterFlow: {
				zoneCount: 6,
				// in kcfs
				1: { min: 0, max: 28 },
				2: { min: 28, max: 35 },
				3: { min: 35, max: 40 },
				4: { min: 40, max: 45 },
				5: { min: 45, max: 50 },
				6: { min: 50, max: 60 },
				// lower limit of zone 1 not defined in safety matrix
				//	but if the river is not flowing you've got other problems
				absMin: 0,
				absMax: 60
			}
		
		},
	
		//	static data from safety matrix
		matrix: {
			
			version: "2016: Revised February 2015 by TRRA Safety Committee and accepted by TRRA Board",
		
			shellType: {
				1: "All boats",
				2: "All boats. For 1x, 2x and 2- without a launch, must have one year rowing experience at TRRA",
				3: "8+, 4+, 4x and 2x, Adaptive LTA racing 2x only",
				4: "8+, 4+ and 4x",
				5: "8+ and 4x",
				6: "8+ and 4x",
				7: "No boats allowed on the water"
			},
		
			launchToShellRatio: {
				1: "Not a requirement",
				2: "Not a requirement unless rowing in Zone 3 daylight conditions when Zone 3 requirements should be followed",
				3: "1 launch per 2 shells (of equal speed)",
				4: "1 launch per 2 shells (of equal speed)",
				5: "1 launch per shell",
				6: "Sufficient launches to (a) carry all rowers and coxes participating in session, and (b) have at least 2 engines as between all launches on the water (towing line required)",
				7: "I said no boats"
			},
		
			coachCertification: {
				1: "No certification level required",
				2: "No certification level required",
				3: "USRA Level 2+ certification",
				4: "USRA Level 2+ certification",
				5: "USRA Level 2+ certification",
				6: "USRA Level 2+ certification",
				7: "Leave them alone, you can't go out"
			},
		
			pfdRequirement: {
				1: "PFDs Optional",
				2: "PFDs Optional",
				3: "PFDs Optional",
				4: "PFDs on all rowers & coxswains",
				5: "PFDs on all rowers & coxswains",
				6: "PFDs on all rowers & coxswains",
				7: "Don't need any where you're staying: on land"
			},
		
			commRequirement: {
				1: "Protected Cell Phone Recommended",
				2: "Protected Cell Phone Required",
				3: "Protected Cell Phone Required",
				4: "Protected Cell Phone Required",
				5: "Protected Cell Phone Required",
				6: "Protected Cell Phone and Marine Radio Required for all coaches; at least one additional person at the boathouse with cell phone, marine radio and car during entire session",
				7: ""
			},
		
			crewSkillLevel: {
				1: "Any Level",
				2: "Any Level; blind boats as specified above",
				3: "Any Level. Adaptive, LTA racers only",
				4: "No Novices or adaptive rowers or equipment allowed on the water",
				5: "No Novices or adaptive rowers or equipment allowed on the water",
				6: "No Novices or adaptive rowers or equipment allowed on the water",
				7: "None required for staying on land"
			},
		
			additionalSafetyItems: {
				1: "Optional",
				2: "One Space Blanket per rower in launch",
				3: "One Space Blanket per rower in launch",
				4: "One Space Blanket per rower in launch",
				5: "One Space Blanket per rower in launch",
				6: "One Space Blanket per rower in launch; one bailer/large sponge/pump in each shell"
			},
		
			addenda: {
				1: "See TRRA website for links to official gauges for water flow (NOAA data from Sharpsburg gauge -- scroll down for flow and use the most recent \"observed data\" regardless of listed time) and water temperature (USGS data from Acmetonia).",
				2: {
					title: "Additional Requirements for Zone 6:",
					count: 7,
					1: "A meeting and letter must be provided to TRRA before rowing in these conditions. A standard letter can be found on the TRRA website.",
					2: "Crews must be strong enough to make meaningful progress upstream through the Millvale cut with not more than 3/4's of rowers rowing",
					3: "Crews must have not less than 2 hours of on-the-water time within the immediately preceding 5-day period",
					4: "Daylight, as defined above, required. You may not shift to the left in daylight from Zone 6 to Zone 5",
					5: "No more than 8 mph of sustained wind in the opposite direction from the current",
					6: "Demonstrate rescue techniques to TRRA staff's satisfaction",
					7: "For youth oriented organizations - Required Parent Group board member representation at each of TRRA's semi-annual Safety Meetings."
				},
				3: "There are various kinds of PFDs available. The TRRA Safety Committee recommends that each rowing program research PFDs to determine which type is best for its members' use. <b>PLEASE NOTE, however, that the TRRA Safety Committee is aware that certain PFD manufacturers do not recommend use of CO<sub>2</sub> inflatable PFDs in air or water conditions below 40° Fahrenheit (4.5° Celcius)."
			}
		
		},
	
		//	primary duty function
		zoneForConditions: function (waterFlow, waterTemp, sunrise, sunset) {
			let flowZone = rank(waterFlow, this.scales.waterFlow);
			let tempZone = rank(waterTemp, this.scales.waterTemp);
			let zone = Math.max(flowZone, tempZone);
			
			// move this into proper place later -> utils.js?	// + TODO: fix sunrise-sunset API yielding sunrise for tomorrow
			if (moment != null) {
				var now = moment();
				var afterDawn = now.isAfter(sunrise);
				var beforeDusk = now.isBefore(sunset);
				if ( (afterDawn && beforeDusk) && (zone > 1 && zone < 6) ) {
					zone -= 1;
				}
			}
			return zone;
		},
		
		zoneColorForWaterFlow: function (waterFlow) {
			let zone = rank(waterFlow, this.scales.waterFlow);
			let color = semanticColors[zone];
			return color;
		},
		
		zoneColorForWaterTemp: function (waterTemp) {
			let zone = rank(waterTemp, this.scales.waterTemp);
			let color = semanticColors[zone];
			return color;
		},
		
		zoneColorForZone: function(zone) {
			if (zone > 0 && zone <= 6) {
				return semanticColors[zone];
			} else if (zone > 6) {
				return '#000000';
			} else {
				return '';
			}
		}
		
	},
	
	//	NOT YET IMPLEMENTED
	//	kayaking, paddleboarding, etc.
	paddling: {
		
		//	scales define zone ranges for condition parameters
		scales: {},
		
		//	static data from safety matrix
		matrix: {},
		
		//	primary duty function
		zoneForConditions: function () {
			
		}
	},

	
};

// EOF
