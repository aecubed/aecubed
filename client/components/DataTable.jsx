import React from 'react';
import Table from 'react-bootstrap/Table';
import Row from './Row.jsx';
export default function DataTable(props) {
  // data looks like [{year:.., wind:..,}, {year:.., wind:..,}, {year:.., wind:..,}]
  // create component array

  const rows = [];
  const data = props.data;
  for (let i = 0; i < data.length; i++) {
    // year: 2019, PSUN: .9, TAVG: 76, TMAX: 99.9, TMIN: 3.5, DX32: 29, DX70: 144, DX90: 40, AWND: 4.2, WSF: 6.8
    const curr = data[i];
    rows.push(<Row key={i}
      year={curr.year}
      PSUN={curr.PSUN}
      TAVG={curr.TAVG}
      TMAX={curr.TMAX}
      TMIN={curr.TMIN}
      DX32={curr.DX32}
      DX70={curr.DX70}
      DX90={curr.DX90}
      AWND={curr.AWND}
      WSF_={curr.WSF}
    />);
  }

  return (
    <>
      <table className='table'>
        <tr>
          <th>year</th>
          <th>PSUN</th>
          <th>TAVG</th>
          <th>TMAX</th>
          <th>TMIN</th>
          <th>DX32</th>
          <th>DX70</th>
          <th>DX90</th>
          <th>AWND</th>
          <th>WSF</th>
        </tr>
        {rows}
      </table>
    </>
  );
}
