const path = require('path');
const fetch = require('node-fetch')
//const mongoose = require('mongoose')
require('dotenv').config();
const { weatherData } = require('../models/dbModel');
const { NOAA_KEY, OPENWEATHER_KEY } = require('../secrets.js');
const COUNTRY_CODE = 'US';

const apiController = {};

// GET request for weather data at FIPS code passed in from prev middleware
<<<<<<< HEAD
apiController.noaaData = async (req, res, next) => { 
  await fetch(`https://www.ncei.noaa.gov/cdo-web/api/v2/data?enddate=2021-12-31&startdate=2012-01-01&locationid=FIPS:${res.locals.fips}&datasetid=GSOY&datatypeid=PSUN&datatypeid=TAVG&datatypeid=TMAX&datatypeid=TMIN&datatypeid=DX32&datatypeid=DX70&datatypeid=DX90&datatypeid=AWND&datatypeid=WSF2&limit=1000`,{
    headers:{
      'token' : NOAA_KEY
    }})
    .then(res => res.json())
=======
apiController.noaaData = async (req, res, next) => {
  const fipsCode = res.locals.data;
  await fetch(`https://www.ncei.noaa.gov/cdo-web/api/v2/data?enddate=2022-08-03&startdate=2012-08-03&locationid=FIPS:${fipsCode}&datasetid=GSOY&datatypeid=PSUN&datatypeid=TAVG&datatypeid=TMAX&datatypeid=TMIN&datatypeid=DX32&datatypeid=DX70&datatypeid=DX90&datatypeid=AWND&datatypeid=WSF2&limit=1000`, {
    headers: {
      'token': NOAA_KEY
    }
  })
    .then(res => { console.log(res); return res.json(); })
>>>>>>> dev
    .then(noaaData => {
      console.table(noaaData.results);
      res.locals.weatherData = noaaData.results;
      return next();
    })
    .catch(err => next({
      log: 'apiController.noaaData failed',
      message: 'failed to fetch weather data'
    }));
};

apiController.noaaDataTypes = async(req, res, next) => {
  const fipsCode = res.locals.fips;
  await fetch(`https://www.ncei.noaa.gov/cdo-web/api/v2/datatypes?enddate=2021-12-31&startdate=2012-01-01&locationid=FIPS:${fipsCode}&limit=1000`,{
    headers:{
      'token' : NOAA_KEY
    }})
    .then(res => res.json())
    .then(noaaData => {
      console.table(noaaData.results);
      res.locals.weatherData = noaaData.results;
      return next();
    })
    .catch(err => next({
      log: 'apiController.noaaDataTypes failed',
      message: 'failed to fetch weather Data Types data'
    }));
};

apiController.formatData = (req, res, next) => {
  try {

    console.log('we hit the formatData middleware');
    const formattedData = [];
    for (let i = 2021; i > 2011; i--) {
      formattedData.push({year: i});
    }
    const yearKey = {
      2021: 0,
      2020: 1, 
      2019: 2,
      2018: 3,
      2017: 4,
      2016: 5,
      2015: 6,
      2014: 7,
      2013: 8,
      2012: 9,
    };
    const getYearIndex = (date) => {
      return yearKey[date.slice(0, 4)];
    };
    res.locals.weatherData.forEach((el) => {
      const index = getYearIndex(el.date);
      formattedData[index][el.datatype] = el.value;
    });
    console.table(formattedData);
    res.locals.formattedData = formattedData;
    return next();
  }
  catch(err) {
    console.log(err);
    return next({
      log: 'apiController.formatData failed',
      message: 'failed to fetch weather data'
    });
  }
};


// apiController.arcgisGeocode = (req, res, next) => {
//   const { state, county } = req.params;
//   fetch(`https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=&subRegion=sourceCountry=USA&f=json&outFields=location&token=${ARCGIS_KEY}`, 
//     {
//       method: 'POST',
//       body: 
//     }
//   )
//     .then(response => response.data)
//     .then(data => {
//       res.locals.geocode = {'lat': data.lat, 'lon': data.lon};
//       res.locals.name = data.name;
//       return next();
//     })
//     .catch(err => next({
//       log: 'apiController.directGeocode failed',
//       message: 'failed to fetch geocode data (lat, long)'
//     }));

// }

apiController.directGeocode = (req, res, next) => {
  // const { zipcode } = req.query;
  const { zip } = req.params;
  fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${COUNTRY_CODE}&appid=${OPENWEATHER_KEY}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      res.locals.geocode = {'lat': data.lat, 'lon': data.lon};
      return next();
    })
    .catch(err => next({
      log: 'apiController.directGeocode failed',
      message: 'failed to fetch geocode data (lat, long)'
    }));
};

apiController.getWeatherData = (req, res, next) => {
  const { lat, lon } = res.locals.geocode;
  // temp, pressure, humidity, wind, precipitation, clouds, sunshine_hours
  fetch(`https://history.openweathermap.org/data/2.5/aggregated/year?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}`)
    .then(response => response.json())
    .then(data => {
      let counter = 0;
      let clouds = 0;
      data.result.forEach(el => {
        counter++;
        clouds += el.clouds.mean;
      });
      console.log(`clouds: ${clouds}, counter: ${counter}, avg: ${clouds / counter}`);
      res.locals.avgCloudCover = (clouds / counter).toFixed(2);
      return next();
    })
    .catch(err => next({
      log: 'apiController.getWeatherData failed',
      message: 'failed to fetch weather data'
    }));
}

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