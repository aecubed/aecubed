const path = require('path');
const fetch = require('node-fetch')
//const mongoose = require('mongoose')
require('dotenv').config();
const { weatherData } = require('../models/dbModel');
const { NOAA_KEY } = require('../secrets.js');

const apiController = {};

// GET request for weather data at FIPS code passed in from prev middleware
apiController.noaaData = async (req, res, next) => { 
  const fipsCode = res.locals.data;
  await fetch(`https://www.ncei.noaa.gov/cdo-web/api/v2/data?enddate=2022-08-03&startdate=2012-08-03&locationid=FIPS:${fipsCode}&datasetid=GSOY&datatypeid=PSUN&datatypeid=TAVG&datatypeid=TMAX&datatypeid=TMIN&datatypeid=DX32&datatypeid=DX70&datatypeid=DX90&datatypeid=AWND&datatypeid=WSF2&limit=1000`,{
    headers:{
      'token' : NOAA_KEY
    }})
    .then(res => {console.log(res); return res.json(); })
    .then(noaaData => {
      res.locals.weather = noaaData;
      return next();
    })
    .catch(err => next({
      log: 'apiController.saveData failed',
      message: 'failed to save weatherData to database'
    }));
};



// apiController.saveData = async (req, res, next) => {
//   try {
//     await weatherModel.create(res.locals.weatherData);
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
//         'temp': {
//           '$avg': '$temp.mean'
//         }, 
//         'pressure': {
//           '$avg': '$pressure.mean'
//         }, 
//         'humidity': {
//           '$avg': '$humidity.mean'
//         }, 
//         'wind': {
//           '$avg': '$wind.mean'
//         }, 
//         'precipitation': {
//           '$avg': '$precipitation.mean'
//         }, 
//         'clouds': {
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

//   const kelvintocelsius = (temp) => {
//     return temp - 273.15;
//   }
  
//   try {
//     const weatherDocs = await weatherModel.aggregate(agg)
//     weatherDocs.forEach(elem => {
//       elem.temp = kelvintocelsius(elem.temp).toFixed(2);
//       elem.pressure = elem.pressure.toFixed(2);
//       elem.humidity = elem.humidity.toFixed(2);
//       elem.wind = elem.wind.toFixed(2);
//       elem.precipitation = elem.precipitation.toFixed(2);
//       elem.clouds = elem.clouds.toFixed(2);
//     })
//     res.locals.meanData = weatherDocs;
//     return next();
//   } catch (error) {
//     return next({
//       log: 'apiController.queryData failed',
//       message: 'failed to query weatherData'
//     })
//   }
// }



//   const poor = 'Poor Performance';
//   const okay = 'Okay Performance'
//   const optimum = 'Optimum Performance';
//   const extreme = 'rapid detoriation of equipment';
//   const undetermined = 'Conclusion cannot be made at this time';
//   const performance = {
//     performanceSolar : '',
//     performanceTurbine : ''
//   };

//   res.locals.monthData = res.locals.meanData[numMonth - 1];
//   const { temp, humidity, wind } = res.locals.monthData;

//   // wind turbine logic
//   if (wind < 2.5) performance.performanceTurbine = poor;
//   else if (wind >= 2.5 && wind < 3) performance.performanceTurbine = okay;
//   else if (wind >= 3 && wind <= 4 ) performance.performanceTurbine = optimum;
//   else performance.performanceTurbine = undetermined;

//   //solar panel logic
//   if (temp < 15 ) performance.performanceSolar = poor; 
//   else if (temp > 35 && humidity > 40) performance.performanceSolar = `${poor} and ${extreme}`;
//   else if (temp >= 15 && temp <= 35 && humidity < 70) performance.performanceSolar = optimum;
//   else if (temp >= 15 && temp <= 35 && humidity > 70) performance.performanceSolar = extreme;
//   else if (temp > 35 && humidity < 40) performance.performanceSolar = extreme;
//   else performance.performanceSolar = undetermined;


//   // calculate percipitation rate 


//   res.locals.performance = performance; 
//   return next()
// }

module.exports = apiController;