const mongoose = require('mongoose');
// we should really rename apiModel to reflect the actual model
const { Fips } = require('../apiModel');

const dbController = {
  getStates: async (req, res, next) => {
    try {
      const states = await Fips.distinct('state').exec();
      console.log(states);
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
      console.log(req.params);
      const counties = await Fips.distinct('county', {state: req.params.state}).exec();
      console.log(counties);
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
  }
};

module.exports = dbController;