
import React from 'react';

export default function Orb(props) {
  return (
    <div className={props.className}>
      <div>{props.headerText}</div>
      <div>{props.value}</div>
    </div>
  );
};

