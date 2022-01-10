const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=74f9b4590573ccb374d95ce1921d8050&query=${latitude},${longitude}`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service', undefined);
		} else if (body.error) {
			callback('unable to find location', undefined);
		} else {
			callback(
				undefined,
				`${body.current.weather_descriptions[0]} : it is currently ${body.current.temperature} degrees out, but feels like ${body.current.feelslike} degrees inside. and the humidity is ${body.current.humidity}%.`
			);
		}
	});
};

module.exports = forecast;

/* const weatherUrl =
	'http://api.weatherstack.com/current?access_key=74f9b4590573ccb374d95ce1921d8050&query=42.3605,-71.0596';

request({ url: weatherUrl, json: true }, (error, response) => {
	//const data = JSON.parse(response.body);
	//console.log(response.body.current);
	if (error) {
		console.log(error, ':cannot fetch api');
	} else if (response.body.error) {
		console.log(response.body.error);
	} else {
		console.log(
			`${response.body.current.weather_descriptions[0]} : it is currently ${response.body.current.temperature} degrees out, but feels like ${response.body.current.feelslike} degrees out.`
		);
	}
});

*/
