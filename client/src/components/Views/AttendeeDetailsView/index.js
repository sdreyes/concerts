import React, { Component, Fragment } from "react";
import API from "../../../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import moment from 'moment';

class AttendeeDetailsView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // Component Mounted
  componentDidMount() {
    // API.getShowDetails(parseInt(this.props.params.showId))
    // .then(res => {
    //   console.log(res.data);
    //   this.setState({ show: res.data }, () => console.log(this.state.show))
    // })
    // .catch(err => console.log(err));
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
              </Col>
            </Row>
          </Fragment>
        }
      </Container>
    )
  }
}

export default AttendeeDetailsView;