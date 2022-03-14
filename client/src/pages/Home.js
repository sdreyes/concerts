import React, { Component, Fragment } from "react";
import API from "../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import {ShowsTable} from "../components/ShowsTable"

class Home extends Component {
  state = {
    shows: []
  }

  componentDidMount() {
    this.loadShows();
  }

  loadShows = () => {
    API.getShows().then(
      res => {
        console.log(res.data);
        this.setState({shows: res.data})
      }
    )
  }
  render() {
    return (
      <Container className="p-3">
        <Row>
          <Col>
            { 
              this.state.shows ? 
                <ShowsTable shows={this.state.shows}/>
                : <h1>No shows</h1>
            }
          </Col>
        </Row>
      </Container> 
    )
  }
}

export default Home;