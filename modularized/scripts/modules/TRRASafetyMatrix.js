//
//	RiverStatusBoard: Information for Rowers and Paddlers
//	Allegheny River information for Three Rivers Rowing Association (TRRA)
//	by Maxwell B Garber <max.garber+dev@gmail.com>
//	TRRASafetyMatrix.js created on 2017-06-26
//


define("TRRASafetyMatrix", ['MathRanges'], function (MathRanges) {
	var theModule = {};
	theModule.meta = {
		//	VCS & Copyright
		version: "0.0.1",
		author: "Maxwell B Garber <max.garber+dev@gmail.com>",
		date: "2017-07-05",
		
		note: "Rules for rowing safety matrix only -- paddling to come later"
	};
	
	theModule.ZoneCriteria = {
		WaterFlow: MathRanges.createRange([
			//	units: kcfs
			{ label: 1, min:  0, max: 28, includeMin: true, includeMax: false },
			{ label: 2, min: 28, max: 35, includeMin: true, includeMax: false },
			{ label: 3, min: 35, max: 40, includeMin: true, includeMax: false },
			{ label: 4, min: 40, max: 45, includeMin: true, includeMax: false },
			{ label: 5, min: 45, max: 50, includeMin: true, includeMax: false },
			{ label: 6, min: 50, max: 60, includeMin: true, includeMax: false }
		]),
		
		WaterTemp: MathRanges.createRange([
			//	units: ˚C
			{ label: 1, min:  10, max:  50, includeMin: false, includeMax: false},
			{ label: 3, min: 4.5, max:  10, includeMin: false, includeMax: false},
			{ label: 4, min:   0, max: 4.5, includeMin: false, includeMax: true}
		])
	};
	
	theModule.zoneForConditions = function (waterFlow, waterTemp, daylight) {
		var flowZone = theModule.ZoneCriteria.WaterFlow.intervalLabelForValue(waterFlow);
		var tempZone = theModule.ZoneCriteria.WaterTemp.intervalLabelForValue(waterTemp);
		var zone = Math.max(flowZone, tempZone);
		if (zone != 6 && zone != 1 && daylight) {
			zone -= 1;
		}
		return zone;
	};
	
	theModule.SafetyRules = {
		RuleTypes: ['ShellType', 'LaunchToShellRatio', 'CoachCertification', 'PFD', 'Communications', 'CrewSkillLevel', 'AdditionalItems'],
		
		ShellType: {
			1: 'All boats',
			2: 'All boats. For 1x, 2x and 2- without a launch, must have one year rowing experience at TRRA',
			3: '8+, 4+, 4x and 2x, Adaptive LTA racing 2x only',
			4: '8+, 4+ and 4x',
			5: '8+ and 4x',
			6: '8+ and 4x'
		},
		
		LaunchToShellRatio: {
			1: 'Not a requirement',
			2: 'Not a requirement unless rowing in Zone 3 daylight conditions when Zone 3 requirements should be followed',
			3: '1 launch to 2 shells (shells of equal speed)',
			4: '1 launch to 2 shells (shells of equal speed)',
			5: '1 to 1',
			6: 'Sufficient launches to ' +
				'(a) carry all rowers and coxes participating in session, and ' +
				'(b) have at least 2 engines as between all launches on the water (towing line required)'
		},
		
		CoachCertification: {
			1: 'Not a requirement',
			2: 'Not a requirement',
			3: 'USRA Level 2',
			4: 'USRA Level 2',
			5: 'USRA Level 2',
			6: 'USRA Level 2'
		},
		
		PFD: {
			1: 'Optional',
			2: 'Optional',
			3: 'Optional',
			4: 'Worn by all rowers and coxswains',
			5: 'Worn by all rowers and coxswains',
			6: 'Worn by all rowers and coxswains'
		},
			
		Communications: {
			1: 'Protected Cell Phone Recommended',
			2: 'Protected Cell Phone Required',
			3: 'Protected Cell Phone Required',
			4: 'Protected Cell Phone Required',
			5: 'Protected Cell Phone Required',
			6: 'Protected Cell Phone and Marine Radio Required for all coaches; '+
				'at least one additional person at the boathouse with cell phone, marine radio and car during entire session'
		},
		
		CrewSkillLevel: {
			1: 'Any Level',
			2: 'Any Level; blind boats as specified above',
			3: 'Any Level. Adaptive, LTA racers only',
			4: 'No Novices or adaptive rowers or equipment allowed on the water',
			5: 'No Novices or adaptive rowers or equipment allowed on the water',
			6: 'No Novices or adaptive rowers or equipment allowed on the water'
		},
		
		AdditionalItems: {
			1: 'Optional',
			2: 'One Space Blanket per rower in launch',
			3: 'One Space Blanket per rower in launch',
			4: 'One Space Blanket per rower in launch',
			5: 'One Space Blanket per rower in launch',
			6: 'One Space Blanket per rower in launch; one bailer/large sponge/pump in each shell'
		},
	
	};
	
	theModule.Addendae = {
		
		DataSources: {
			WaterFlow: 'NOAA Sharpsburg',
			WaterTemp: 'USGS Acmetonia'
		},
		
		Zone6: {
			1: ' A meeting and letter must be provided to TRRA before rowing in these conditions. A standard letter can be found on the TRRA website.',
			2: 'Crews must be strong enough to make meaningful progress upstream through the Millvale cut with not more than 3/4\'s of rowers rowing',
			3: 'Crews must have not less than 2 hours of on-the-water time within the immediately preceding 5-day period',
			4: 'Daylight, as defined above, required. You may not shift to the left in daylight from Zone 6 to Zone 5',
			5: 'No more than 8 mph of sustained wind in the opposite direction from the current',
			6: 'Demonstrate rescue techniques to TRRA staff\'s satisfaction',
			7: 'For youth oriented organizations - Required Parent Group board member representation at each of TRRA\'s semi-annual Safety Meetings'
		},
		
		PFDs: "There are various kinds of PFDs available. The TRRA Safety Committee recommends that each rowing program research PFDs to determine which type is best for its members' use. <b>PLEASE NOTE, however, that the TRRA Safety Committee is aware that certain PFD manufacturers do not recommend use of CO<sub>2</sub> inflatable PFDs in air or water conditions below 40° Fahrenheit (4.5° Celcius).</b>"
		
	}
	
	
	return theModule;
});

// EOF
