import React from 'react';
import axios from 'axios';


  
const handleSubmit = (e) => {
  e.preventDefault();
  const zipcode = e.target.value;

  axios.post('/map', {zipcode: zipcode})
    .then(response => response.data)
    .then(data => {
      const {temp, pressure, humidity, wind, precipitation, cloud} = data;
    })
    .catch((err) => { next({
      log: 'failed to receive weather data',
      message: 'failed recieve weather data'
    })})
}

export default handleSubmit;