const axios = require('axios');
const path = require('path');
// const { text } = require('express');
// const fs = require('fs');
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
      res.locals.name = data.name;
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
  let numMonth;
  if (typeof month !== 'number') {
    switch(month.toLowerCase()) {
      case 'january':
        numMonth = 1;
        break;
      case 'february' :
        numMonth = 2
        break;
      case 'march' :
        numMonth = 3
        break;
      case 'april' :
        numMonth = 4
        break;
      case 'may' :
        numMonth = 5
        break;
      case 'june' :
        numMonth = 6
        break;
      case 'july' :
        numMonth = 7
        break;
      case 'august' :
        numMonth = 8
        break;
      case 'september' :
        numMonth = 9
        break;
      case 'october' :
        numMonth = 10
      case 'november' :
        numMonth = 11
        break;
      case 'december' :
        numMonth = 12
        break;
      default: numMonth = 1
    }
  }

  const poor = 'Poor Performance';
  const okay = 'Okay Performance'
  const optimum = 'Optimum Performance';
  const extreme = 'rapid detoriation of equipment';
  const undetermined = 'Conclusion cannot be made at this time';
  const performance = {
    performanceSolar : '',
    performanceTurbine : ''
  };

  res.locals.monthData = res.locals.meanData[numMonth - 1];
  const { temp, humidity, wind } = res.locals.monthData;

  // wind turbine logic
  if (wind < 2.5) performance.performanceTurbine = poor;
  else if (wind >= 2.5 && wind < 3) performance.performanceTurbine = okay;
  else if (wind >= 3 && wind <= 4 ) performance.performanceTurbine = optimum;
  else performance.performanceTurbine = undetermined;

  //solar panel logic
  if (temp < 15 ) performance.performanceSolar = poor; 
  else if (temp > 35 && humidity > 40) performance.performanceSolar = `${poor} and ${extreme}`;
  else if (temp >= 15 && temp <= 35 && humidity < 70) performance.performanceSolar = optimum;
  else if (temp >= 15 && temp <= 35 && humidity > 70) performance.performanceSolar = extreme;
  else if (temp > 35 && humidity < 40) performance.performanceSolar = extreme;
  else performance.performanceSolar = undetermined;


  // calculate percipitation rate 


  res.locals.performance = performance; 
  return next()
}

module.exports = apiController