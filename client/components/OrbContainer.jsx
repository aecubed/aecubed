import React from 'react';
import Orb from './Orb.jsx';


const OrbContainer = (props) => {
  const orbs = [];
  const texts = ['Temperature (°C)', 'Sunshine (%)', 'Peak 2min Wind(m/s)', 'Avg Wind(m/s)'];
  const classNames = ['temp-orb', 'sunshine-orb', 'peakwind-orb', 'avgwind-orb'];
  const value = [props.temperatureOrb, props.sunshineOrb, props.peakWindOrb, props.avgWindOrb];
  for (let i = 0; i < texts.length; i++) {
    orbs.push(
      <Orb
        headerText={texts[i]}
        className={classNames[i]}
        prop={props[i]}
        key={'orb' + i}
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