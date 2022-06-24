import React, { Component } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import locations from "../../../utils/locations";
import Select from 'react-select';
import API from "../../../utils/API";

class AddVenueModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venue: {
        venue: "",
        city: "",
        state: "",
        country: "United States"
      }
    };
  }

  isUnitedStates = country => country === "United States";

  handleVenueChange(e) {
    let venue = {...this.state.venue}
    venue[e.target.name] = e.target.value;
    this.setState({venue}, () => console.log(this.state));
  }

  handleSelectLocationChange = (value, action) => {
    let venue = {...this.state.venue}
    venue[action.name] = value.value;
    if (action.name === "country" && !this.isUnitedStates(value.value)) venue.state = null;
    this.setState({venue}, () => console.log(this.state));
  }

  createNewVenue = () => {
    let venueAlreadyExists = this.props.venues.find(
      venue => venue.venue.toLowerCase() === this.state.venue.venue.toLowerCase() &&
      venue.city.toLowerCase() === this.state.venue.city.toLowerCase()
    )
    console.log(venueAlreadyExists);
    if (venueAlreadyExists) {
      console.log("This venue exists already");
    } else {
      API.createVenue(this.state.venue).then(
        res => {
          this.props.loadVenues()
          this.props.handleClose("showVenueModal")
          this.resetState();
        }
      )
    }
  }

  resetState = () => {
    this.setState({
      venue: {
        venue: "",
        city: "",
        state: "",
        country: "United States"
      }
    })
  }

  render() {
    const stateOptions = locations.states.map(state => ({ value: state.abbreviation, label: state.name }));
    const countryOptions = locations.countries.map(country => ({ value: country, label: country }));
    return(
      <Modal show={this.props.show} size="lg" onHide={e => {
        this.resetState();
        this.props.handleClose("showVenueModal")
      }}>
        <Modal.Header>
          <Modal.Title>Create a New Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="venueName">
              <Form.Label>Venue Name*</Form.Label>
              <Form.Control type="text" name="venue" autoComplete="off" value={this.state.venue.venue} onChange={e => this.handleVenueChange(e)} />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="venueCity">
                  <Form.Label>City*</Form.Label>
                  <Form.Control type="text" name="city" value={this.state.venue.city} onChange={e => this.handleVenueChange(e)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="venueState">
                  <Form.Label>State{this.isUnitedStates(this.state.venue.country)?"*":""}</Form.Label>
                  <Select name="state"
                    options={stateOptions}
                    blurInputOnSelect={true}
                    closeMenuOnSelect={true}
                    closeMenuOnScroll={false}
                    isClearable={false}
                    isSearchable={true}
                    isMulti={false}
                    value={stateOptions.find(state => state.value === this.state.venue.state)}
                    onChange={this.handleSelectLocationChange}
                    tabSelectsValue={true}
                    isDisabled={!this.isUnitedStates(this.state.venue.country)}
                    key={this.state.venue.country} /* check for country change to refresh this field */
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="venueCountry">
                  <Form.Label>Country*</Form.Label>
                  <Select name="country"
                    options={countryOptions}
                    blurInputOnSelect={true}
                    closeMenuOnSelect={true}
                    closeMenuOnScroll={false}
                    isClearable={false}
                    isSearchable={true}
                    isMulti={false}
                    value={countryOptions.find(country => country.value === this.state.venue.country)}
                    onChange={this.handleSelectLocationChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" className="float-end" onClick={() => this.createNewVenue()}>
              Create Venue
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default AddVenueModal;