const axios = require('axios');
const path = require('path');
// const { text } = require('express');
const fs = require('fs');
require('dotenv').config();
const weatherModel = require('./apiModel');

const apiController = {};

const APIkey = process.env.APIkey;
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

  axios.get(`https://history.openweathermap.org/data/2.5/aggregated/year?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(response => response.data.result)
    .then(data => {
      res.locals.weatherData = data;
      // console.log(res.locals.weatherData);
      // const filepath = path.join(__dirname, '/dump/weatherData.json')
      // fs.writeFileSync(filepath, res.locals.weatherData);
      return next();
    })
    .catch(err => next({
      log: 'apiController.getWeatherData failed',
      message: 'failed to fetch weather data'
    }));
}

apiController.saveData = async (req, res, next) => {
  try {
    await weatherModel.create(res.locals.weatherData);
    return next();
  } catch (error) {
    console.error(error.message);
    return next({
      log: 'apiController.saveData failed',
      message: 'failed to save weatherData to database'
    })
  }
}

apiController.queryData = async (req, res, next) => {

  const agg = [
    {
      '$group': {
        '_id': '$month', 
        'temp': {
          '$avg': '$temp.mean'
        }, 
        'pressure': {
          '$avg': '$pressure.mean'
        }, 
        'humidity': {
          '$avg': '$humidity.mean'
        }, 
        'wind': {
          '$avg': '$wind.mean'
        }, 
        'precipitation': {
          '$avg': '$precipitation.mean'
        }, 
        'clouds': {
          '$avg': '$clouds.mean'
        }
      }
    }, 
    {
      '$sort': {
        '_id': 1
      }
    }
  ];

  const kelvintocelsius = (temp) => {
    return temp - 273.15;
  }
  
  try {
    const weatherDocs = await weatherModel.aggregate(agg)
    weatherDocs.forEach(elem => {
      elem.temp = kelvintocelsius(elem.temp).toFixed(2);
      elem.pressure = elem.pressure.toFixed(2);
      elem.humidity = elem.humidity.toFixed(2);
      elem.wind = elem.wind.toFixed(2);
      elem.precipitation = elem.precipitation.toFixed(2);
      elem.clouds = elem.clouds.toFixed(2);
    })
    res.locals.meanData = weatherDocs;
    return next();
  } catch (error) {
    return next({
      log: 'apiController.queryData failed',
      message: 'failed to query weatherData'
    })
  }
}

apiController.comparedDetails = (req, res, next) => {
  // get request from client about month info
  const { month } = req.body;

  const poor = 'Poor Performance';
  const okay = 'Okay Performance'
  const optimum = 'Optimum Performance';
  const extreme = 'Detoriating Conditions';
  const undetermined = 'Conclusion cannot be made at this time';
  const performance = {
    performanceSolar : '',
    performanceTurbine : ''
  };

  const { temp, humidity, wind } = res.locals.meanData[month - 1];

  // wind turbine logic
  if (wind < 3.5) performance.performanceTurbine = poor;
  else if (wind >= 3.5 && wind < 9) performance.performanceTurbine = okay;
  else if (wind >= 10 && wind <= 15 ) performance.performanceTurbine = optimum;
  else if (wind > 15 && wind < 25) performance.performanceTurbine = okay;
  else if (wind > 25) performance.performanceTurbine = extreme;
  else performance.performanceTurbine = undetermined;

  //solar panel logic
  if (temp < 59 ) performance.performanceSolar = poor; 
  else if (temp > 95 && humidity > 40) performance.performanceSolar = `${poor} and ${extreme}`;
  else if (temp >= 59 && temp <= 95 && humidity < 40) performance.performanceSolar = optimum;
  else if (temp > 95 && humidity < 40) performance.performanceSolar = extreme;
  else performance.performanceSolar = undetermined;


  // calculate percipitation rate 


  res.locals.performance = performance; 
  return next()
}

module.exports = apiController