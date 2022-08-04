import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrbContainer from '../components/OrbContainer.jsx';
import { useEffect } from 'react';

const Main = () => {

  const [states, setStates] = useState(['-- Select a State --']);
  const [counties, setCounties] = useState(['-- Select a County --']);

  const [selectedState, setSelectedState] = useState('-- Select a State --');
  const [selectedCounty, setSelectedCounty] = useState('-- Select a Counties --');

  const [weatherData, setWeatherData] = useState([]);
  // On component mount
  // get the list of states 
  // pass the states list down to a states dropdown component
  
  //intial fetch request to populate states dropdown
  useEffect(() => {
    console.log('page has loaded, fetching states');
    fetch('http://localhost:8080/map/states')
      .then(res => res.json())
      .then(res => {
        console.log('result of hitting states endpoint:');
        // console.log(res);
        setStates(['-- Select a State --'].concat(res));
      })
      .catch(err => {
        console.log('error in fetching states');
        console.log(err);
      });
  }, []);

  //fetch request that is triggered when state is selected
  useEffect(() => {
    console.log('selected state has changed, updating counties');
    fetch(`http://localhost:8080/map/states/${selectedState}`)
      .then(res => res.json())
      .then(res => {
        console.log('result of hitting counties endpoint:');
        // console.log(res);
        setCounties(['-- Select a County --'].concat(res));
      })
      .catch(err => {
        console.log('error in fetching counties');
        console.log(err);
      });
  }, [selectedState]);

  //viewable in client console to see if information is being set correctly - happens on load
  useEffect(() => {
    console.log('county has been selected, waiting for submit button');
    console.log(`current selection : ${selectedState}, ${selectedCounty}`);
  });



//methods to handle events

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
    statesDropdown.push(<option value = {states[i]} key = {states[i][i]}> {states[i]} </option>);
  }

  //populates the counties dropdown
  const countiesDropdown = [];
  console.log(counties);

  for(let i = 0 ; i < counties.length; i++){
    countiesDropdown.push(<option value = {counties[i]} key = {counties[i]}> {counties[i]} </option>);
  }
  

  // const updateState = (e) => {
  //   setSelectedState(e.target.value);
  //   console.log(selectedState);
  // };
  

  const handleEvent = async() => {
    try{
      console.log('Get data firing')
      const response = await fetch(`http://localhost:8080/map/states/${selectedState}/${selectedCounty}`);
      const data = response.json();
      //console.log(Data); 
      setWeatherData(data);
      //console.log(data);
    }
    catch (err){
      console.log(`Error has occurred on getting weather data. Error: ${err}`);
    }
    
  };



  return (
    <>
      <div className='main'>
        <div className='body'>
        
            
          
          {/* Location Table */}
          <div className='table-container'>
            <div className = 'testTable'>
              <div id ="dropDown">
                
                <h3>States</h3>
                <select id= "selectState" onChange = {(e) => {setSelectedState(e.target.value);}}>
                  {statesDropdown}
                </select>

                <h3>Counties</h3>
                <select id= "selectCounty" onChange = {(e) => {setSelectedCounty(e.target.value);}}>
                  {countiesDropdown}
                </select>
              </div>
              <button id = 'submitStateCounty' type ='submit' onClick = {handleEvent}>Get Data</button>
            </div>
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
};


export default Main;
