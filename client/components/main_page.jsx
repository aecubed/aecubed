import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import handleSubmit from './weather_data';

const Main = () => {
//State for main energy sources. Default to best energy sources for the top 3 locations overall.
  const [solarPower, setSolarPower] = useState("Number Ranking");
  const [windPower, setWindPower] = useState("Number Ranking");
  const [rainPower, setRainPower] = useState("Number Ranking");

//State for best locations. Set default to 3 best locations overall in US.
  const [firstLocation, setFirstLocation] = useState("Location");
  const [secondLocation, setSecondLocation] = useState("Location");
  const [thirdLocation, setThirdLocation] = useState("Location");



return (
  <>

    {/* Navbar */}
      <nav class="navbar navbar-light" style="background-color:#29B675;">
        <a class="navbar-brand" href="#">AE^3</a>
      </nav>


    {/* Energy Selection */}
      <div class="btn-group" role="group" aria-label="Choose Energy Source">
        <button type="button" class="btn solar-btn">Solar</button>
        <button type="button" class="btn wind-btn">Wind</button>
        <button type="button" class="btn rain-btn">Rain</button>
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
    <table class="table">
      <thead>
        <th scope="col">Locations</th>
        <th scope="col">Best Energy</th>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Location1</th>
          <th scope="row">Energy Source</th>
        </tr>
      </tbody>
    </table>


    {/* Energy Orbs */}
    <div class="orbs-parent">
      <div class="solar-orb">Solar</div>
      <div class="wind-orb">Wind</div>
      <div class="rain-orb">Rain</div>
    </div>

  </>
)
};

export default Main;
