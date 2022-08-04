"use strict"
const express = require('express');
const apiController = require('../controllers/apiController');
const dbController = require('../controllers/dbController');
const mapRouter = express.Router();
<<<<<<< HEAD

const weather = require('../apiController.js')
=======
const weather = require('../controllers/apiController.js');
>>>>>>> dev

// mapRouter.post('/', 
//   apiController.directGeocode, apiController.getWeatherData, 
//   apiController.saveData, apiController.queryData, apiController.comparedDetails,
//   (req, res) => {
//     console.timeEnd('Middleware time');
//     res.status(200).json({ 'name': res.locals.name,
//                            'average': res.locals.monthData,
//                            'performance': res.locals.performance });
//   }
// )

// fire after loading page
mapRouter.get('/states', dbController.getStates, (req, res) => {
  return res.status(200).json(res.locals.states);
})

// fire after selecting state
mapRouter.get('/states/:state', dbController.getCounties, (req, res) => { // to get counties - look into how to make router end point url more intuitive
  return res.status(200).json(res.locals.counties);
})

// fire after clicking the submit button
mapRouter.get('/states/:state/:county', dbController.getFips, weather.noaaData, (req, res) => { // to get weather // test later  weather.noaaData,
  console.log(req.params);
  const testData = [
    { year: 2019, PSUN: .9, TAVG: 76, TMAX: 99.9, TMIN: 3.5, DX32: 29, DX70: 144, DX90: 40, AWND: 4.2, WSF: 6.8 },
    { year: 2020, PSUN: .91, TAVG: 75, TMAX: 102.9, TMIN: 3.1, DX32: 25, DX70: 160, DX90: 30, AWND: 4.1, WSF: 6.1 },
    { year: 2021, PSUN: .89, TAVG: 74, TMAX: 97.9, TMIN: 3.7, DX32: 31, DX70: 150, DX90: 35, AWND: 4.3, WSF: 5.7 }
  ];
  return res.status(200).json(testData); // res.locals.data
  // query api by using fips as params here
  // handle data 
});

module.exports = mapRouter; 