# RiverStatusBoard

by Maxwell B Garber &lt;max.garber+dev@gmail.com&gt;

version 0.3.0


## Description

- RiverStatusBoard is a static HTML page to display the current river conditions and safety rules in effect for rowers, paddlers, and other users of a river.

- It is built to display information for Three Rivers Rowing Association, but can be customized to operate on other bodies of water.


## Dependencies

- The project bundle includes and uses:
	- Bootstrap
	- jQuery
	- Moment
	- Knockout
	- RequireJS


## Project Structure

	RiverStatusBoard
	├── Readme.md	
		# this file
	├── devops
	│   └── deploy.sh
			# use to copy to hosting destination
	├── frameworks
	│   └── bootstrap-3.3.7-dist
	│       └── ... 
	├── index.html
		# the main page
	├── scripts
	│   ├── RiverStatusBoardApp.js
			# the top-level object of the application, with config settings
	│   ├── RiverStatusBoardTests.js
			# unit tests for the project
	│   ├── libraries
	│   │   ├── jquery-3.2.1.min.js
	│   │   ├── knockout-3.4.2.js
	│   │   ├── moment-2.18.1.min.js
	│   │   └── require-2.3.3.js
	│   ├── main.js
			# instantiates the app object & starts the application
	│   └── modules
	│       ├── APIConcierge
	│       │   ├── APICache.js
					# caching utility for the API clients
	│       │   ├── APIClients
					# one client module per API domain
	│       │   │   ├── gov.usgs.waterservices.js
	│       │   │   ├── gov.weather.water.js
	│       │   │   └── org.sunrise-sunset.js
	│       │   └── APIConcierge.js
					# wrapper-layer for 3rd-party API dependencies
	│       ├── ColorScales.js
				# maps sets of numerical ranges to sets of colors
	│       ├── MathRanges.js
				# models numerical ranges/limits
	│       ├── TRRASafetyMatrix.js
				# contains all the safety rules and information
	│       └── Utilities.js
				# miscellaneous functions & reference values
	└── styles
	    └── RiverStatusBoardStyles.css
    		# non-Bootstrap styles for the HTML page

## Classes & Runtime Objects
- **_RiverStatusBoardApp_**: once instantiated, serves as the viewmodel for Knockout, as the sole binding context for the HTML page
- **_APIConcierge_**: singleton serving as a one-stop shop for all data retrieval calls; a layer behind which all selections and implementations of APIs are obscured


## Notes
- currently uses Sharpsburg, rather than Acmetonia, station for flow data
- only tested so far on Safari/WebKit

## Future Features

- settings page (e.g. Acmetonia or Sharpsburg)
- recent history of values (Chart.js/D3)
