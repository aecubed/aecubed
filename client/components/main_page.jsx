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



return (
  //Navbar


  //Energy Orbs
 <div class = "orbs-parent">
  <div class = "solar-orb">Solar</div>
  <div class = "wind-orb">Wind</div>
  <div class = "rain-orb">Rain</div>
  <Link to = "/about" >About</Link>
 </div>
);
};

export default Main;
