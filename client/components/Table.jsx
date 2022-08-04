import { render } from "react";
import Table from 'react-bootstrap/Table'
export default Table = props => {
  // data looks like [{year:.., wind:..,}, {year:.., wind:..,}, {year:.., wind:..,}]
  // create component array
  render() {
    const rows = [];
    const data = props.data;
    for (let i = 0; i < data.length; i++) {
      rows.push(<Row year={data[i].year} sun={data[i].sun} temp={data[i].temp} wind1={data[i].wind1} wind2={data[i].wind2} />)
    }

    return (
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Sunshine</th>
              <th>Temperature</th>
              <th>Wind</th>
              <th>Wind</th>

            </tr>
          </thead>
        </Table>
      </>
    )
  }
}