import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
//State for main energy sources. Default to best energy sources for the top 3 locations overall.
  const [solarPower, setSolarPower] = useState("Number Ranking");
  const [windPower, setWindPower] = useState("Number Ranking");
  const [rainPower, setRainPower] = useState("Number Ranking");

//State for best locations. Set default to 3 best locations overall in US.
  const [firstLocation, setFirstLocation] = useState("Location");
  const [secondLocation, setSecondLocation] = useState("Location");
  const [thirdLocation, setThirdLocation] = useState("Location");

//State for the 7 data points for each location
  const [temperatureOrb, setTemperatureOrb] = useState()

//methods to handle events
  
  //handle user input of zip code
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


return (
  <>
    {/* Energy Selection */}
      <div className="btn-group" role="group" aria-label="Choose Energy Source">
        <button type="button" className="btn solar-btn">Solar</button>
        <button type="button" className="btn wind-btn">Wind</button>
        <button type="button" className="btn rain-btn">Rain</button>
      </div>


    {/* Enter ZIP */}
    <form onSubmit={handleSubmit}>
      <div class="form group">
        <label for="zipcodeInput">ZIP Code</label>
        <input type="number" class="form-control" id="inputZIP" placeholder="Enter ZIP"></input>
        <button id="submitZIP" type="submit">Enter</button>
      </div>
    </form>


    {/* Location Table */}
    <table className="table">
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
      <div className="solar-orb">Solar</div>
      <div className="wind-orb">Wind</div>
      <div className="rain-orb">Rain</div>
    </div>

  </>
)
};

export default Main;
