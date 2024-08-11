import React, { Component, Fragment } from "react";
import API from "../../../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import {ShowsTable} from "../../ShowsTable";
import moment from 'moment';

class AttendeeDetailsView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // Component Mounted
  componentDidMount() {
    console.log("Testing loading attendee")
    API.getAttendeeDetails(parseInt(this.props.params.attendeeId))
    .then(res => {
      console.log(res.data);
      this.setState(
        { attendee: res.data }, 
        () => console.log(this.state.attendee)
      )
    })
    .catch(err => console.log(err));
  }
  // Render
  render() {
    const attendee = this.state.attendee;
    return (
      <Container className="p-3">
        {
          attendee &&
          <Fragment>
            <Row>
              <Col>
              <h2>{`${attendee.name}'s Shows`}</h2>
              {attendee.shows && 
              <ShowsTable shows={attendee.shows}/>}
              </Col>
            </Row>
          </Fragment>
        }
      </Container>
    )
  }
}

export default AttendeeDetailsView;