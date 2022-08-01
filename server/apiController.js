const axios = require('axios');
const path = require('path');
// const { text } = require('express');
const fs = require('fs');
require('dotenv').config();
const { weatherModel } = require('./apiModel');

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
      res.locals.meanData = mean;
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

// apiController.saveData = async (req, res, next) => {
//   try {
//     const arr = res.locals.weatherData;
//     console.log(arr);
//     await arr.forEach(elem => {
//       weatherModel.create(elem);
//     })
//     // await weatherModel.create(res.locals.weatherData);
//     return next();
//   } catch (error) {
//     console.error(error.message);
//     return next({
//       log: 'apiController.saveData failed',
//       message: 'failed to save weatherData to database'
//     })
//   }
// }

// apiController.queryData = async (req, res, next) => {

//   const agg = [
//     {
//       '$group': {
//         '_id': '$month', 
//         'tempAvg': {
//           '$avg': '$temp.mean'
//         }, 
//         'pressureAvg': {
//           '$avg': '$pressure.mean'
//         }, 
//         'humidityAvg': {
//           '$avg': '$humidity.mean'
//         }, 
//         'windAvg': {
//           '$avg': '$wind.mean'
//         }, 
//         'precipitationAvg': {
//           '$avg': '$precipitation.mean'
//         }, 
//         'cloudsAvg': {
//           '$avg': '$clouds.mean'
//         }
//       }
//     }, 
//     {
//       '$sort': {
//         '_id': 1
//       }
//     }
//   ];
  
//   try {
//     const weatherDocs = await weatherModel.collection('weatherdatas').aggregate(agg)
//     res.locals.meanData = weatherDocs;
//     return next();
//   } catch (error) {
//     return next({
//       log: 'apiController.queryData failed',
//       message: 'failed to query weatherData'
//     })
//   }
// }

apiController.comparedDetails = (req, res, next) => {
  const { temp, humidity, wind } = res.locals.meanData
  const poor = 'Poor Performance';
  const okay = 'Okay Performance'
  const optimum = 'Optimum Performance';
  const extreme = 'Detoriating Conditions';
  const undetermined = 'Conclusion cannot be made at this time';
  const performance = {
    performanceSolar : '',
    performanceTurbine : ''
  };
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