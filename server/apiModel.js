require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'aecubed'
  })
  .then(() => console.log('Mongoose connection to database SUCCESS'))
  .catch((err) => console.log('Mongoose connection to database FAILED'));

const Schema = mongoose.Schema;

/* terminal script to store json data to mongodb collection:
mongoimport --uri="mongodb+srv://emilybae1705:jDBx91fopPtomCJD@cluster0.dckxv74.mongodb.net/?retryWrites=true&w=majority" 
--jsonArray --file=dump/weatherData.json
*/
const weatherDataSchema = new Schema({
  month: Number,
  day: Number,
  temp: [{ median: Number }, { mean: Number }, { st_dev: Number }],
  pressure: [{ median: Number }, { mean: Number }, { st_dev: Number }],
  humidity: [{ median: Number }, { mean: Number }, { st_dev: Number }],
  wind: [{ median: Number }, { mean: Number }, { st_dev: Number }],
  precipitation: [{ median: Number }, { mean: Number }, { st_dev: Number }],
  clouds: [{ median: Number }, { mean: Number }, { st_dev: Number }]
});

// weatherDataSchema.methods.avg = function() {
//   const sum = {
//     temp: this.temp.mean,
//     pressure: this.pressure.mean,
//     humidity: this.humidity.mean,
//     wind: this.wind.mean,
//     precipitation: this.precipitation.mean,
//     clouds: this.clouds.mean
//   }
// }

const weatherData = mongoose.model('weatherData', weatherDataSchema);


module.exports = {weatherData}