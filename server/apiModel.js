require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URI } = require('./secrets.js')


mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "weatherDb"
  })
  .then(() => console.log('Mongoose connection to database SUCCESS'))
  .catch((err) => console.log('Mongoose connection to database FAILED'));

const Schema = mongoose.Schema;

const specificSchema = new Schema({
  median: Number,
  mean: Number,
  st_dev: Number
})

const weatherDataSchema = new Schema({
  month: Number,
  day: Number,
  temp: specificSchema,
  pressure: specificSchema,
  humidity: specificSchema,
  wind: specificSchema,
  precipitation: specificSchema,
  clouds: specificSchema
});

const fipsSchema = new Schema({
  fips: String,
  county: String,
  state: String
})


const weatherData = mongoose.model('weatherData', weatherDataSchema);
const Fips = mongoose.model('fips', fipsSchema);

// const pg = require('pg');

// // to store in secrets later!!!!!!!!
// var conString = "postgres://ewfpelld:XH6J6Gzu2qiug2QvFAYCxMold-lmuX4J@rajje.db.elephantsql.com/ewfpelld" //Can be found in the Details page
// var client = new pg.Client(conString);
// client.connect(function (err) {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function (err, result) {
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });



module.exports = { weatherData, Fips }
