import React from 'react';

export default function Row(props) {
  console.log('row ---', props.AWND);
  return (
    <tr>
      <td>{props.year}</td>
      <td>{props.PSUN}</td>
      <td>{props.TAVG}</td>
      <td>{props.TMAX}</td>
      <td>{props.TMIN}</td>
      <td>{props.DX32}</td>
      <td>{props.DX70}</td>
      <td>{props.DX90}</td>
      <td>{props.AWND}</td>
      <td>{props.WSF_}</td>
    </tr>
  );
}