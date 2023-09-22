import React, { Component, Fragment } from "react";
import API from "../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import {ShowsTable} from "../components/ShowsTable";
import Select from 'react-select';

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadShows = this.props.loadShows.bind(this);
    // this.artistFilters = this.props.artistFilters.bind(this);
    this.state={
      selectedArtistFilters: [],
      artistFilters: []
    }
  }
  
  handleArtistFilterChange = values => {
    this.setState({
      selectedArtistFilters: values,
      artistFilters: values.map(a => a.value)
    }, () => {
      console.log("artistFilters:");
      console.log(this.state.artistFilters)
      this.props.loadShows(this.state.artistFilters);
    });
  };
  
  render() {
    console.log(this.props.shows);
    const artistSelectOptions=this.props.artists && this.props.artists.map(artist => (
      {
        value: artist.artistId,
        label: artist.artist
      }
    ))
    return (
      <Container className="p-3">
        <Row>
          <Col className="pb-3">
          <Select name="artists"
            placeholder="Filter by artist"
            options={artistSelectOptions}
            blurInputOnSelect={false}
            closeMenuOnSelect={true}
            closeMenuOnScroll={false}
            isClearable={false}
            isSearchable={true}
            isMulti={true}
            value={this.state.selectedArtistFilters}
            onChange={this.handleArtistFilterChange}
          />
          </Col>
        </Row>
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