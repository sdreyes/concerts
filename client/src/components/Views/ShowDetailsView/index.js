import React, { Component, Fragment } from "react";
import API from "../../../utils/API";
import {Container, Row, Col} from 'react-bootstrap';

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
    return (
      <Container className="p-3">
        <Row>
          {
            this.state.show &&
            <Col>
              <h2>{this.state.show.title}</h2>
              <h5>
                {this.state.show.startDate}
                {this.state.show.endDate ? ` - ${this.state.show.endDate}` : ``}
              </h5>
            </Col>
          }
        </Row>
      </Container>
    )
  }
}

export default ShowDetailsView;