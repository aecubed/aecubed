const axios = require('axios');
const { text } = require('express');

const apiController = {};

const APIkey = 'd3767e1fa9e2f79cbac2ff22817e9251';
const countrycode = 'US'; // refers to ISO codes

apiController.directGeocode = (req, res, next) => {
  const { zipcode } = req.body;
  axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countrycode}&appid=${APIkey}`)
    .then(response => response.data)
    .then(data => {
      res.locals.geocode = {'lat': data.lat, 'lon': data.lon};
      return next();
    })
    .catch(err => next({
      log: 'apiController.directGeocode failed',
      message: 'failed to fetch geocode data (lat, long)'
    }));

}

apiController.getWeatherData = (req, res, next) => {
  const { lat, lon } = res.locals.geocode;
  // temp, pressure, humidity, wind, precipitation, clouds, sunshine_hours
  const mean = {
    temp: 0,
    pressure: 0,
    humidity: 0,
    wind: 0,
    precipitation: 0,
    clouds: 0
  }
  const kelvintocelsius = (temp) => {
    return temp - 273.15;
  }

  axios.get(`https://history.openweathermap.org/data/2.5/aggregated/year?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(response => response.data.result)
    .then(data => {
      data.forEach(elem => {
        mean.temp += kelvintocelsius(elem.temp.mean)/365,
        mean.pressure += elem.pressure.mean/365,
        mean.humidity += elem.humidity.mean/365,
        mean.wind += elem.wind.mean/365,
        mean.precipitation += elem.precipitation.mean/365,
        mean.clouds += elem.clouds.mean/365
      })
      res.locals.weatherData = mean;
      return next();
    })
    .catch(err => next({
      log: 'apiController.getWeatherData failed',
      message: 'failed to fetch weather data'
    }));
}

module.exports = apiController