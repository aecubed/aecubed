const mongoose = require('mongoose');
// we should really rename apiModel to reflect the actual model
const { Fips } = require('../models/dbModel');

const dbController = {
  getStates: async (req, res, next) => {
    try {
      const states = await Fips.distinct('state').exec();
      res.locals.states = states;
      return next();
    }
    catch(err) {
      console.log(err.message);
      return next({
        log: 'dbController.getStates failed',
        message: 'failed to retrieve states from database'
      });
    }
  },

  getCounties: async (req, res, next) => {
    try {
      const counties = await Fips.distinct('county', {state: req.params.state}).exec();
      res.locals.counties = counties;
      return next();
    }
    catch(err) {
      console.log(err.message);
      return next({
        log: 'dbController.getCounties failed',
        message: 'failed to retrieve counties from database'
      });
    }
  },

  //Retreiving FIPS code from MongoDB from client entry of county and state
  getFips: async(req, res, next) => {
    try{
      const { county, state } = req.params;
      const doc = await Fips.findOne({county: county, state: state});
      res.locals.fips = doc.fips;
      console.log(doc.fips);
      return next();
    } catch (error) {
      return next({
        log: 'apiController.getFips failed',
        message: 'failed to retrieve FIPS code from database'
      });
    } 
  }
};

module.exports = dbController;