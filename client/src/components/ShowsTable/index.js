import React from "react";
import { Table } from 'react-bootstrap';

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
              <td>{show.startDate}</td>
              <td>{show.title}</td>
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