import React from 'react';
import Orb from './Orb.jsx';


const OrbContainer = (props) => {
  const orbs = [];
  const texts = ['Temperature (°C)', 'Humidity(%)', 'Wind(m/s)', 'Precipitation(mm)', 'Cloud Cover(%)']
  const classNames = ['temp-orb', 'humidity-orb', 'wind-orb', 'precip-orb', 'cloud-orb']
  const value = [props.temperatureOrb, props.humidityOrb, props.windOrb, props.precipitationOrb, props.cloudOrb];
  for (let i = 0; i < texts.length; i++) {
    orbs.push(
      <Orb 
        headerText = {texts[i]}
        className = {classNames[i]}
        prop = {props[i]}
        key = {'orb' + i}
      />
    )
  }
  return (
    <div className="orbs-parent">
      {orbs}
    </div>
  );
};

export default OrbContainer;