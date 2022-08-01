"use strict"
const express = require('express');
const apiController = require('../apiController');
const mapRouter = express.Router();

mapRouter.get('/',
  apiController.directGeocode, apiController.getWeatherData, apiController.comparedDetails,
  (req, res) => {
    res.status(200).json(res.locals);
  }
)



module.exports = mapRouter; 