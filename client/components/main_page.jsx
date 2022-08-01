import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Main = () => {
//State for main energy sources. Will display ranking of best energy source for a given location.
  const [solarPower, setSolarPower] = useState("Number Ranking");
  const [windPower, setWindPower] = useState("Number Ranking");
  const [rainPower, setRainPower] = useState("Number Ranking");

//State for best locations. Set default to 3 best locations overall in US.
  const [firstLocation, setFirstLocation] = useState("Location");
  const [secondLocation, setSecondLocation] = useState("Location");
  const [thirdLocation, setThirdLocation] = useState("Location");

//State for the zip code input
  const[zipCode, setZipCode] = useState("");
//State for the 5 data points for each location
  const [temperatureOrb, setTemperatureOrb] = useState();
  const [humidityOrb, setHumidityOrb] = useState();
  const [windOrb, setWindOrb] = useState();
  const [precipitationOrb, setPrecipitationOrb] = useState();
  const [cloudOrb, setCloudOrb] = useState();

//methods to handle events
  
  //handle user input of zip code
  const handleSubmit = (e) => {
    e.preventDefault();
    const zipcode = e.target.value;
  
    axios.post('/map', {zipcode: zipcode})
      .then(response => response.data)
      .then(data => {
        console.log(data)
        const {temp, humidity, wind, precipitation, cloud} = data;
      })
      .catch((err) => { next({
        log: 'failed to receive weather data',
        message: 'failed recieve weather data'
      })})
  }


return (
  <>
  <div className='body'>

    {/* Energy Selection */}
      <div className="btn-group" role="group" aria-label="Choose Energy Source">
        <button type="button" className="btn solar-btn">Solar</button>
        <button type="button" className="btn wind-btn">Wind</button>
        <button type="button" className="btn rain-btn">Rain</button>
      </div>


    {/* Enter ZIP */}
    <div className="form group">
      <form onSubmit={e => {handleSubmit(e)}}>
        <label htmlFor="zipcodeInput">ZIP Code</label>
        <input type="number" className="form-control" id="inputZIP" placeholder="Enter ZIP" value={zipCode} onChange={e => {setZipCode(e.target.value)}}></input>
        <input id="submitZIP" type="submit" value='Enter'></input>
      </form>
    </div>


    {/* Location Table */}
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Location</th>
          <th scope="col">Best Energy</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">Location</td>
          <td scope="row">Energy Source</td>
        </tr>
      </tbody>
    </table>


    {/* Energy Orbs */}
    <div className="orbs-parent">
      <div className="temp-orb">
        <div>Temperature</div>
        <div id='temp-value'>{temperatureOrb}</div>
      </div>
      <div className="humidity-orb">Humidity</div>
      <div className="wind-orb">Wind</div>
      <div className="precip-orb">Precipitation</div>
      <div className="cloud-orb">Clouds</div>
    </div>

    </div>

  </>
)
};

export default Main;
