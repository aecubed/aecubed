"use strict"
const express = require('express');
const apiController = require('../apiController');
const mapRouter = express.Router();

mapRouter.post('/',
  apiController.directGeocode, apiController.getWeatherData, 
  apiController.saveData, apiController.queryData, apiController.comparedDetails,
  (req, res) => {
    res.status(200).json({ 'name': res.locals.name,
                           'average': res.locals.monthData,
                           'performance': res.locals.performance });
  }
)


module.exports = mapRouter; 