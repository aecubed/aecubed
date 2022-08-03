"use strict"
const express = require('express');
const apiController = require('../apiController');
const mapRouter = express.Router();

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
mapRouter.get('/states', (req, res)=> {
  //returns it .json( _states_ );
  return res.status(200).json();
})

// fire after selecting state
mapRouter.get('/states/:state', (req, res)=> { // to get counties - look into how to make router end point url more intuitive
  //recieves user input state in req.params.state 
  //returns the counties 
  return res.status(200).json();
})

// fire after clicking the submit button

//
mapRouter.get('/states/:state/:county', (req, res)=> { // to get weather
  //recieve user input county in req.params.county
  //req.params.state ->new york 
  //const {state, county} = req.params; > fetch data API with state + county > > 
  return res.status(200).json(req.params);
  // query api by using fips as params here
  // handle data 
});

module.exports = mapRouter; 