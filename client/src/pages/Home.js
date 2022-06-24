import React, { Component, Fragment } from "react";
import API from "../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import {ShowsTable} from "../components/ShowsTable"

class Home extends Component {
  constructor(props) {
    super(props)
    this.loadShows = this.props.loadShows.bind(this)
  }
  
  render() {
    console.log(this.props.shows);
    return (
      <Container className="p-3">
        <Row>
          <Col>
            {this.props.shows && <ShowsTable shows={this.props.shows}/>}
          </Col>
        </Row>
      </Container> 
    )
  }
}

export default Home;