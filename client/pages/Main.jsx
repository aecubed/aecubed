import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrbContainer from '../components/OrbContainer.jsx';
import { useEffect } from 'react';

const Main = () => {
  /*
//State for main energy sources. Will display ranking of best energy source for a given location.
  const [solarPower, setSolarPower] = useState("Number Ranking");
  const [windPower, setWindPower] = useState("Number Ranking");
  const [rainPower, setRainPower] = useState("Number Ranking");

//State for best locations. Set default to 3 best locations overall in US.
  const [firstLocation, setFirstLocation] = useState("Location");
  const [secondLocation, setSecondLocation] = useState("Location");
  const [thirdLocation, setThirdLocation] = useState("Location");
  */

  //State for API results
  const [performanceSolar, setPerformanceSolar] = useState()
  const [performanceTurbine, setPerfomanceTurbine] = useState()
  //State for the zip code input and Location of zip and month
  // const[month, setMonth] = useState("");
  
  const[zipCode, setZipCode] = useState('');
  const[location, setLocation] = useState('');
  //State for the 5 data points for each location
  const [temperatureOrb, setTemperatureOrb] = useState();
  const [humidityOrb, setHumidityOrb] = useState();
  const [windOrb, setWindOrb] = useState();
  const [precipitationOrb, setPrecipitationOrb] = useState();
  const [cloudOrb, setCloudOrb] = useState();
  const [states, setStates] = useState(['-- Select a State --']);
  const [counties, setCounties] = useState(['-- Select a County --']);

  const [selectedState, setSelectedState] = useState('-- Select a State --');

  // On component mount
    // get the list of states 
    // pass the states list down to a states dropdown component
  
  useEffect(() => {
    console.log('page has loaded, fetching states');
    fetch('http://localhost:8080/map/states')
      .then(res => res.json())
      .then(res => {
        console.log('result of hitting states endpoint:');
        console.log(res);
        setStates(['-- Select a State --'].concat(res));
      })
      .catch(err => {
        console.log('error in fetching states');
        console.log(err);
      })
  }, []);

  useEffect(() => {
    console.log('selected state has changed, updating counties');
    fetch(`http://localhost:8080/map/states/${selectedState}`)
      .then(res => res.json())
      .then(res => {
        console.log('result of hitting counties endpoint:');
        console.log(res);
        setCounties(['-- Select a County --'].concat(res));
      })
      .catch(err => {
        console.log('error in fetching counties');
        console.log(err);
      })
  }, [selectedState]);



//methods to handle events
  
  
  // On selecting a state
    // make a GET request to the API endpoint associated with that state
    // get the list of counties for that state
    // pass that list down to the "counties" dropdown component
    
  //takes state value
    //makes a get request

  //THIS SHOULD BE SET TO FIRE ON THE STATE DROPDOWN
  //   const selectCounty = async () => { 

  //   try {
  //     console.log(before county fetch request);
  //     const reponse = await fetch('http://localhost:8080/map/state/${selectedStatevalue}')
  //     const countiesList = await response.json();
  //     console.log(countiesList);
  //     console.log(counties);
  //     setCounties(counties.concat(countiesList));
  //   }
  //     catch(err){
  //       console.log(`Something went wrong when trying to load counties ${err}`)
  //     }
     
  //   } 
  // }
  
  //populates state dropdown
  const statesDropdown = [];
  console.log(counties);

  for(let i = 0 ; i < states.length; i++){
    statesDropdown.push(<option value = {states[i]}> {states[i]} </option>);
  }

  //populates the counties dropdown
  const countiesDropdown = [];
  console.log(counties);

  for(let i = 0 ; i< counties.length; i++){
    countiesDropdown.push(<option value = {counties[i]}> {counties[i]} </option>);
  }
  

    

  // On clicking submit
    // hit the correct api endpoint
    // populate all of the state fields

  //handle user input of zip code
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('invoked handle submit');
    axios.post('/map', { zipcode: zipCode })
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
        setZipCode('');
      })
      .catch((err) => { 
        return {
          log: 'failed to receive weather data',
          message: 'failed recieve weather data'
        };
      });
  };



  return (
    <>
      <div className='main'>
        <div className='body'>
        
            
          
          {/* Location Table */}
          <div className='table-container'>
            <div className = 'testTable'>
              <div id ="dropDown">

                <h2>States</h2>
                <select >
                  {statesDropdown}
                </select>

                <h2>Counties</h2>
                <select >
                  {countiesDropdown}
                </select>

              </div>
            </div>

            <div className="form-group">
              <form onSubmit={handleSubmit}>
                <label htmlFor="zipcodeInput">ZIP Code</label>
                <input type="number" className="form-control" id="inputZIP" placeholder="Enter ZIP" value={zipCode} onChange={e => {setZipCode(e.target.value)}}></input>
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
          <OrbContainer 
            temperature='temperatureOrb' 
            humidity='humidityOrb' 
            wind='windOrb'
            precipitation='precipitationOrb'
            cloudCover='cloudOrb'
          />
        </div>
      </div>
    </>
  );
}


export default Main;
