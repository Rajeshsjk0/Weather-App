const request = require('request');
//enocdeURIComponent() - to change adress if special charecter comes in
const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFqZXNoc2prMCIsImEiOiJja3h6emF3cmkwMmpqMnhvYmV1b2ttcHFiIn0.e3a-an5RXd6P1BRFB20_MQ`;
	request({ url: url, json: true }, (error, { body }) => {
		if (error) {
			callback('unable to connect to location services', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;

//geocoding

/*const geocodeUrl =
	'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicmFqZXNoc2prMCIsImEiOiJja3h6emF3cmkwMmpqMnhvYmV1b2ttcHFiIn0.e3a-an5RXd6P1BRFB20_MQ&limit=1';

request({ url: geocodeUrl, json: true }, (error, response) => {
	if (error) {
		console.log(error, ':cannot fetch api');
	} else if (response.body.features.length === 0) {
		console.log('Unable to find location try another');
	} else {
		const latitude = response.body.features[0].center[0];
		const longitude = response.body.features[0].center[1];
		console.log(`The lat and lang are: ${latitude}, ${longitude}`);
	}
}); */
