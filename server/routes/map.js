"use strict"
const express = require('express');
const apiController = require('../controllers/apiController');
const dbController = require('../controllers/dbController');
const mapRouter = express.Router();
const weather = require('../controllers/apiController.js');

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
mapRouter.get('/states/:state/:county', dbController.getFips, weather.noaaData, weather.formatData, (req, res)=> { // to get weather // test later  weather.noaaData,
  return res.status(200).json(res.locals.formattedData);
});

mapRouter.get('/cloudcover/:zip', apiController.directGeocode, apiController.getWeatherData, (req, res) => {
  return res.send(res.locals.avgCloudCover);
});

module.exports = mapRouter; 