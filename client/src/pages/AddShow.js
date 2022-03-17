import React, { Component, Fragment } from "react";
import API from "../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import {AddShowForm} from '../components/Forms/AddShowForm';

class AddShow extends Component {
  state = {
    page: "show",
    artists: [],
    venues: []
  }
  // Component Mounted
  componentDidMount() {
    this.loadArtists();
    this.loadVenues();
  }
  // Load Artists
  loadArtists = () => {
    API.getArtists().then(
      res => {
        console.log(res.data);
        this.setState({artists: res.data});
      }
    )
  }
  // Load Venues
  loadVenues = () => {
    API.getVenues().then(
      res => {
        console.log(res.data);
        this.setState({venues: res.data});
      }
    )
  }
  // Render
  render() {
    return (
      <Container className="p-3">
        <Row>
          <Col>
          <AddShowForm />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddShow;