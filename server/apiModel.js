require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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


const weatherData = mongoose.model('weatherData', weatherDataSchema);


module.exports = weatherData
