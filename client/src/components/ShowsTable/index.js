import React, {Fragment} from "react";
import { Table } from 'react-bootstrap';
import moment from 'moment';

export function ShowsTable({shows}) {
  let showYears = [];
  shows.forEach(show => {
    if(!showYears.includes(moment(show.startDate).year())) {
      showYears.push(moment(show.startDate).year())
    }
  });
  return(
    <Fragment>
      {`${shows.length} ${shows.length === 1 ? "show" : "shows"}!`}
      <Table striped bordered>
        <thead>
          <tr>
            <th>Date</th>
            <th>Show</th>
            <th>Venue</th>
          </tr>
        </thead>
        <tbody>
          {shows.map(show => {
            return (
              <tr key={show.showId}>
                <td>{moment(show.startDate).format("MM/DD/YYYY")}</td>
                <td>
                  <a className="link-dark" href={`/show/${show.showId}`}>
                    {show.title}
                  </a>
                </td>
                <td>
                  {show.location.venue}
                  <br/>
                  <small>{`${show.location.city}, ${show.location.state ? show.location.state : show.location.country}`}</small>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Fragment>
  )
};