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

//State for Performances
  const [performanceSolar, setPerformanceSolar] = useState()
  const [performanceTurbine, setPerfomanceTurbine] = useState()
//State for the zip code input and Location of zip and month
  const[month, setMonth] = useState("");
  const[zipCode, setZipCode] = useState("");
  const[location, setLocation] = useState("");
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
    console.log('invoked handle submit')
    console.log(month)
    axios.post('/map', { zipcode: zipCode, month: month })
      .then(response => response.data)
      .then(data => {
        // console.log(data)
        const name = data.name;
        const { temp, humidity, wind, precipitation, clouds } = data.average;
        console.log(data.average)
        const { performanceSolar, performanceTurbine } = data.performance;
        setTemperatureOrb(temp)
        setHumidityOrb(humidity)
        setWindOrb(wind)
        setPrecipitationOrb(precipitation)
        setCloudOrb(clouds)
        setPerfomanceTurbine(performanceTurbine)
        setPerformanceSolar(performanceSolar)
        setLocation(name);
        setZipCode("");
        setMonth("");
      })
      .catch((err) => { return {
        log: 'failed to receive weather data',
        message: 'failed recieve weather data'
      }})
  }


return (
  <>
  <div className='main'>
  <div className='body'>

 
      {/* <div className="btn-group" role="group" aria-label="Choose Energy Source">
        <button type="button" className="btn solar-btn">Solar</button>
        <button type="button" className="btn wind-btn">Wind</button>
        <button type="button" className="btn rain-btn">Rain</button>
      </div> */}


    {/* Location Table */}
    <div className='table-container'>

    <div className="form-group">
      <form onSubmit={handleSubmit}>
        <label htmlFor="zipcodeInput">ZIP Code</label>
        <input type="number" className="form-control" id="inputZIP" placeholder="Enter ZIP" value={zipCode} onChange={e => {setZipCode(e.target.value)}}></input>
        <label htmlFor="monthInput">Month</label>
        <input type="text" className="form-control" id="input-month" placeholder="Enter Month" value={month} onChange={e => {setMonth(e.target.value)}}></input>
        <button id="submitZIP" type="submit">Enter</button>
      </form>

    </div>
    <table className="table table-dark">
      <thead className='table1'>
        <tr>
          <th scope="col">Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">{location}</td>
        </tr>
      </tbody>
    </table>

    <table className="table table-light">
      <thead>
        <tr>
          <th>Solar Performance</th>
          <th>Wind Performance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">{performanceSolar}</td>
          <td scope="row">{performanceTurbine}</td>
        </tr>
      </tbody>
    </table>
    </div>

    {/* Energy Orbs */}
    <div className="orbs-parent">
      <div className="temp-orb">
        <div>Temperature(°C)</div>
        <div id='temp-value'>{temperatureOrb}</div>
      </div>
      <div className="humidity-orb">
       <div>Humidity(%)</div>
       <div id='humidity-value'>{humidityOrb}</div>
      </div>
      <div className="wind-orb">
        <div>Wind(m/s)</div>
        <div id='wind-value'>{windOrb}</div>
      </div>
      <div className="precip-orb">
        <div>Precipitation(mm)</div>
        <div id='precip-value'>{precipitationOrb}</div>
      </div>
      <div className="cloud-orb">
        <div id='clouds-value'>Cloud Cover(%)</div>
        <div>{cloudOrb}</div>
      </div>
    </div>

    </div>

  </div>
  </>
)
};


export default Main;
