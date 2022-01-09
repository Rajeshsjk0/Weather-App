const path = require('path');
const express = require('express'); //function - call it to create a new express app
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for express config
const public_directoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engines and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(public_directoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Rajesh',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Rajesh',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is some helpful text.',
		title: 'help',
		name: 'Rajesh',
	});
});

app.get('/Weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must enter an address',
		});
	}

	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({
					error: error,
				});
			} else {
				forecast(latitude, longitude, (error, forecastData) => {
					if (error) {
						return res.send({
							error: error,
						});
					} else {
						return res.send({
							forecast: forecastData,
							location,
							address: req.query.address,
						});
					}
				});
			}
		}
	);
});

/* app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term',
		});
	}
	console.log(req.query.search);
	res.send({
		products: [],
	});
}); */

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Rajesh',
		errorMessage: 'help article not found',
	});
});
//* means anything that has not been defined so far
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Rajesh',
		errorMessage: 'Page Not Found',
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});

/* app.get('', (req, res) => {
	res.send('<h1>Weather</h1>');
}); -- no longer needed we are adding it as html page using .use
*/ // if user tries to get something at a specific url give hrml or json. 2 arguments (route and what to do- function it takes two arguments request and response )

//app.com - route - for root ('') give nothing as a parameter
//app.com/help - route/help - ('/help')
//app.com/about - route- ('/about')

/* app.get('/help', (req, res) => {
	res.send([
		{
			name: 'andrew',
			age: 27,
		},
		{
			name: 'Rajesh',
			age: 28,
		},
	]);
});

app.get('/about', (req, res) => {
	res.send('<h1>About Page!</h1>');
}); */
