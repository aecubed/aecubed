const axios = require('axios');
const { text } = require('express');

const apiController = {};

const APIkey = 'd3767e1fa9e2f79cbac2ff22817e9251';
const countrycode = 'US'; // refers to ISO codes

// apiController.directGeocode = (req, res, next) => {
//   const { zipcode } = req.body;
//   axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countrycode}&appid=${APIkey}`)
//     .then(response => response.data[0])
//     .then(data => {
//       res.locals.geocode = {'lat': data.lat, 'lon': data.lon};
//       return next();
//     })
//     .catch(err => next({
//       log: 'apiController.directGeocode failed',
//       message: 'failed to fetch geocode data (lat, long)'
//     }));

// }

//  apiController.getWeatherData = async (req, res, next) => {
//   const { lat, lon } = res.locals.geocode;
//   const yearData = [];
//   // temp, pressure, humidity, wind, precipitation, clouds, sunshine_hours
//   try {
//     for (let month = 1; month <= 3; month++) {
//       const response = axios.get(`https://history.openweathermap.org/data/2.5/aggregated/month?month=${month}&lat=${lat}&lon=${lon}&appid=${APIkey}`)
//       const data = response.data.result;

//     }
//   }
//   for (let month = 1; month <= 3; month++) {
//     axios.get(`https://history.openweathermap.org/data/2.5/aggregated/month?month=${month}&lat=${lat}&lon=${lon}&appid=${APIkey}`)
//       .then(response => response.data.result)
//       .then(data => {
//         yearData.push({
//           temp: data.temp.mean,
//           pressure: data.pressure.mean,
//           humidity: data.humidity.mean,
//           wind: data.wind.mean,
//           precipitation: data.precipitation.mean,
//           clouds: data.clouds.mean,
//           sunshine_hours: data.sunshine_hours
//         })
//       })
//       .catch(err => next({
//         log: 'apiController.getWeatherData failed',
//         message: 'failed to fetch weather data'
//       }));
//   }
//   res.locals.yearData = yearData;
//   return next();
// }

module.exports = apiController