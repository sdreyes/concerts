import React, { Component, Fragment } from "react";
import API from "../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import AddShowForm from '../components/Forms/AddShowForm';

class AddShow extends Component {
  constructor(props) {
    super(props)
    this.loadShows = this.props.loadShows.bind(this)
    this.loadVenues = this.props.loadVenues.bind(this)
    this.loadArtists = this.props.loadArtists.bind(this)
  }
  // Component Mounted
  componentDidMount() {

  }
  // Render
  render() {
    return (
      <Container className="p-3">
        <Row>
          <Col>
          <AddShowForm 
            shows={this.props.shows}
            venues={this.props.venues}
            artists={this.props.artists}
            loadShows={this.loadShows}
            loadVenues={this.loadVenues}
            loadArtists={this.loadArtists}
          />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AddShow;