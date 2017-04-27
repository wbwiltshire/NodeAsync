var request = require('request-promise');

async function Get(options) { 
	var result;
	
	try {
		return await request.get(options);
	}
	catch (e) {
		console.log(e);
	}
}

async function GetHDHomeRunInfo() {
	var options = { 
		uri: 'http://hdhomerun.local/discover.json',
		//method: 'GET',	//Don't need to explicitly set
		qs: {},
		json: true			//automatically parse the JSON response
	};
	console.log('Starting Discover');
	var discover = await Get(options); 
	console.log("Discover: ", discover);
	
	options = { 
		uri: discover.LineupURL,
		//method: 'GET',	//Don't need to explicitly set
		qs: {},
		json: true			//automatically parse the JSON response
	};
	
	console.log('Starting Lineup');
	var lineup = await Get(options); 
	console.log("Lineup: ", lineup[0]);
	
	return "Ending GetHDHomeRunInfo";
}

console.log('Starting WebGet');

GetHDHomeRunInfo().then( f => { console.log(f); });

console.log('Ending WebGet');