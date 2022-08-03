
import React from 'react';

const Orb = (props) => {
  return (
    <div className = {props.className}>
      <div>{props.headerText}</div>
      <div>{props.value}</div>
    </div>
  );
};

export default Orb;