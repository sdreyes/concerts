import React, { Component } from "react";
import {Form, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import Select from 'react-select';
import API from "../../utils/API";

class ShowFilters extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.props.handleFilterChange.bind(this)
    this.filterShows = this.props.filterShows.bind(this);
    this.state = {
      selectedArtistFilters: [],
      artistFilters: [],
      selectedVenueFilters: [],
      venueFilters: [],
      selectedYearFilters: [],
      yearFilters: []
    }
  }
  // Component Mounted
  componentDidMount() {
    API.getArtists().then(
      res => {
        this.setState({artists: res.data});
      }
    );
    API.getVenues().then(
      res => {
        this.setState({venues: res.data});
      }
    );
    API.getShows().then(
      res => {
        this.setState({shows: res.data});
      }
    )
  }

  // Render
  render() {
    const artistSelectOptions=this.state.artists && 
    this.state.artists.map(artist => (
      {
        value: artist.artistId,
        label: artist.artist
      }
    ));
    const venueSelectOptions=this.state.venues && 
    this.state.venues.map(venue => (
      {
        value: venue.venueId,
        label: `${venue.venue} (${venue.city}, ${venue.state ? venue.state : venue.country})`
      }
    ));
    let years = [];
    this.state.shows && this.state.shows.forEach(show => {
      if(!years.includes(moment(show.startDate).year())) {
        years.push(moment(show.startDate).year())
      }
    });
    const yearSelectOptions = years.map(year => ({
        value: year,
        label: year
      })
    )
    return (
      <Row>
        {/* ===== ARTIST FILTER ===== */ }
        <Col lg={4} md={4} sm={6} xs={6} >
          <Form.Group className="mb-2" controlId="showArtist">
            <Form.Label>Artist(s)</Form.Label>
            <Select name="artists"
              placeholder="Filter by artist"
              options={artistSelectOptions}
              blurInputOnSelect={false}
              closeMenuOnSelect={true}
              closeMenuOnScroll={false}
              isClearable={true}
              isSearchable={true}
              isMulti={true}
              value={this.selectedArtistFilters}
              onChange={(selection) => this.handleFilterChange(selection, "Artist")}
            />
          </Form.Group>
        </Col>
        {/* ===== VENUE FILTER ===== */ }
        <Col lg={4} md={4} sm={6} xs={6}>
          <Form.Group className="mb-2" controlId="showVenue">
            <Form.Label>Venue(s)</Form.Label>
            <Select name="venues"
              placeholder="Filter by venue"
              options={venueSelectOptions}
              blurInputOnSelect={false}
              closeMenuOnSelect={true}
              closeMenuOnScroll={false}
              isClearable={true}
              isSearchable={true}
              isMulti={true}
              value={this.selectedVenueFilters}
              onChange={(selection) => this.handleFilterChange(selection, "Venue")}
            />
          </Form.Group>
        </Col>
        {/* ===== YEAR FILTER ===== */ }
        <Col lg={4} md={4} sm={6} xs={6}>
          <Form.Group className="mb-3" controlId="showYear">
            <Form.Label>Year(s)</Form.Label>
            <Select name="years"
              placeholder="Filter by year"
              options={yearSelectOptions}
              blurInputOnSelect={false}
              closeMenuOnSelect={true}
              closeMenuOnScroll={false}
              isClearable={true}
              isSearchable={false}
              isMulti={true}
              value={this.selectedYearFilters}
              onChange={(selection) => this.handleFilterChange(selection, "Year")}
            />
          </Form.Group>
        </Col>
      </Row>
    )
  }
}

export default ShowFilters;