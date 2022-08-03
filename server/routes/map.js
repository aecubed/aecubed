"use strict"
const express = require('express');
const apiController = require('../apiController');
const dbController = require('../controllers/dbController');
const mapRouter = express.Router();

const weather = require('../apiController.js')
console.log(weather)

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

//
mapRouter.get('/states/:state/:county', weather.getFips,  (req, res)=> { // to get weather // test later  
  //recieve user input county in req.params.county
  //req.params.state ->new york 
  //const {state, county} = req.params; > fetch data API with state + county > > 
  return res.status(200).json(res.locals.data);
  // query api by using fips as params here
  // handle data 
});

module.exports = mapRouter; 