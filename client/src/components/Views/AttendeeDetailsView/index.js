import React, { Component, Fragment } from "react";
import API from "../../../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import ShowsTable from "../../ShowsTable";

class AttendeeDetailsView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // Component Mounted
  componentDidMount() {
    API.getAttendeeDetails(parseInt(this.props.params.attendeeId))
    .then(res => {
      this.setState(
        { attendee: res.data }, 
        () => console.log(this.state.attendee)
      )
    })
    .catch(err => console.log(err));
  }
  // Render
  render() {
    return (
      <Container className="p-3">
        {
          this.state.attendee &&
          <Fragment>
            <Row>
              <Col>
              <h2>{`${this.state.attendee.name}'s Shows`}</h2>
              <ShowsTable shows={this.state.attendee.shows}/>
              </Col>
            </Row>
          </Fragment>
        }
      </Container>
    )
  }
}

export default AttendeeDetailsView;