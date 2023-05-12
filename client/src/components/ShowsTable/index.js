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
      {showYears.map(year => {
          return (
            <Fragment key={year}>
              <h2 className="text-center">{year}</h2>
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
                  {shows.filter(show => moment(show.startDate).year() === year).map(show => {
                    return (
                      <tr key={show.showId}>
                        <td>{moment(show.startDate).format("MM/DD")}</td>
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
            </Fragment>
          )
      })}
    </Fragment>
  )
};