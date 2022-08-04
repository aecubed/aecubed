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
      <div className='table-body'>
        <table className="table table-bordered table-dark">
          <tr align-middle >
            <th>Year</th>
            <th>Sunshine %</th>
            <th>Average Temperature</th>
            <th>Max Temperature</th>
            <th>Min Temperature</th>
            <th>Days with Temperature  &lt; 32F</th>
            <th>Days with Temperature  &gt; 70F</th>
            <th>Days with Temperature &gt; 90F</th>
            <th>Average Wind Speed</th>
            <th>Fastest Wind Speed</th>
          </tr>
          {rows}
        </table>
      </div>
    </>
  );
}
