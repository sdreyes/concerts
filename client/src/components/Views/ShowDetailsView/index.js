import React, { Component, Fragment } from "react";
import API from "../../../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import moment from 'moment';

class ShowDetailsView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // Component Mounted
  componentDidMount() {
    API.getShowDetails(parseInt(this.props.params.showId))
    .then(res => {
      console.log(res.data);
      this.setState({ show: res.data }, () => console.log(this.state.show))
    })
    .catch(err => console.log(err));
  }
  // Render
  render() {
    const show = this.state.show;
    return (
      <Container className="p-3">
        {
          show &&
          <Fragment>
            <Row>
              <Col>
                <h1>{show.title}</h1>
                <h5>
                  <i class="bi bi-calendar3 text-secondary text-opacity-50"></i>
                  {` ${moment(show.startDate).format("dddd, MMMM Do, YYYY")}`}
                  {show.endDate ? ` - ${moment(show.endDate).format("dddd, MMMM Do, YYYY")}` : ``}
                </h5>
                <h5>
                  <i class="bi bi-geo-alt-fill text-secondary text-opacity-50"></i>
                  {` ${show.location.venue} `}
                  {`(${show.location.city}, ${show.location.state ? show.location.state : show.location.country})`}
                </h5>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs="7" lg="5" className="mb-3">
                <h3>Line-up</h3>
                <ul class="list-group">
                  {show.artistLineup.map(artist => <li class={`list-group-item ${artist.lineup.isHeadliner ? "fw-bold" : ""}`}>{artist.artist}</li>)}
                </ul>
              </Col>
              <Col xs="5" lg="3" className="mb-3">
                <h3>Attendees</h3>
                <ul class="list-group">
                  {show.attendees.map(person => <li class="list-group-item"><a className="link-dark" href={`/attendee/${person.attendeeId}`}>{person.name}</a></li>)}
                </ul>
              </Col>
              {
                show.notes ?
                <Col lg>
                  <h3>Show Notes</h3>
                  <p>{show.notes}</p>
                </Col> : <Fragment />
              }
            </Row>
          </Fragment>
        }
      </Container>
    )
  }
}

export default ShowDetailsView;