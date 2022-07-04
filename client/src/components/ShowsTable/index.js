import React from "react";
import { Table } from 'react-bootstrap';
import moment from 'moment';

export function ShowsTable({shows}) {
  return(
    <Table striped bordered>
      <thead>
        <tr>
          <th>Date</th>
          <th>Show</th>
          <th>Venue</th>
          <th>City</th>
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
              <td>{show.location.venue}</td>
              <td>
                {`${show.location.city}, ${show.location.state ? show.location.state : show.location.country}`}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
};