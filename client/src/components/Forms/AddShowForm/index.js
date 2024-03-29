/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component, Fragment} from "react";
import { Form, Button, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import AddVenueModal from '../AddVenueModal';
import AddArtistModal from '../AddArtistModal';
import AddAttendeeModal from '../AddAttendeeModal';
import API from "../../../utils/API";

class AddShowForm extends Component {
  constructor(props) {
    super(props);
    this.loadShows = this.props.loadShows.bind(this);
    this.loadVenues = this.props.loadVenues.bind(this);
    this.loadArtists = this.props.loadArtists.bind(this);
    this.loadAttendees = this.props.loadAttendees.bind(this);
    this.state={
      newShow: {
        title: "",
        venueId: null,
        startDate: null,
        endDate: null,
        notes: ""
      },
      lineup: [{
        artistId: null,
        showId: null,
        isHeadliner: false,
        setlist: null
      }],
      audience: [1, 2],
      selectedAudience: [
        {
          value: 1,
          label: "Shelby Reyes"
        },
        {
          value: 2,
          label: "Sam Kaplan"
        }
      ],
      showVenueModal: false,
      showArtistModal: false,
      showAttendeeModal: false
    };
  };
  // Component Mounted
  componentDidMount() {
    console.log(this.props.artists);
    console.log(this.props.venues);
    console.log(this.props.attendees);
    console.log(this.state.audience)
  }

  handleShowChange(e) {
    let newShow = {...this.state.newShow};
    newShow[e.target.name] = e.target.value;
    this.setState({newShow}, () => console.log(this.state.newShow));
  }

  handleLineupChange(e, i) {
    let lineup = [...this.state.lineup];
    lineup[i][e.target.name] = e.target.value;
    this.setState({lineup});
  };

  handleHeadlinerChange(e, i) {
    let lineup = [...this.state.lineup];
    lineup[i][e.target.name] = e.target.checked;
    this.setState({lineup});
  };

  addArtistToLineup(e) {
    e.preventDefault();
    this.setState({
      lineup: [
        ...this.state.lineup, 
        {
          artistId: null,
          showId: null,
          isHeadliner: false,
          setlist: null
        }
      ]
    }, () => console.log(this.state.lineup));
  };

  removeArtistFromLineup(e, i) {
    e.preventDefault();
    var newLineup = [...this.state.lineup];
    newLineup.splice(i, 1);
    this.setState({lineup: newLineup}, () => console.log(this.state.lineup));
  };

  handleArtistSelect(e, i) {
    console.log(e);
    console.log(i);
    let lineup = [...this.state.lineup];
    lineup[i].artistId = e.value;
    this.setState({lineup}, () => console.log(this.state.lineup));
  };

  handleVenueSelect(e) {
    console.log(e);
    let newShow = {...this.state.newShow};
    newShow.venueId = e.value;
    this.setState({newShow}, () => console.log(this.state.newShow));
  };

  handleAudienceChange = values => {
    this.setState({
      selectedAudience: values,
      audience: values.map(a => a.value)
    });
  };

  showOrHideModal = modal => {
    this.setState({
      [modal]: this.state[modal] === false
    })
  };

  resetState = () => {
    this.setState({
      newShow: {
        title: "",
        venueId: null,
        startDate: null,
        endDate: null,
        notes: ""
      },
      lineup: [{
        artistId: null,
        showId: null,
        isHeadliner: false,
        setlist: null
      }],
      audience: [1, 2],
      selectedAudience: [
        {
          value: 1,
          label: "Shelby Reyes"
        },
        {
          value: 2,
          label: "Sam Kaplan"
        }
      ],
      showVenueModal: false,
      showArtistModal: false,
      showAttendeeModal: false
    })
  }

  createNewShow = () => {

    API.createShow(this.state.newShow).then(
      res => {
        const showId = res.data.showId;
        const audience = this.state.audience.map(attendeeId => {
          return {
           showId: showId,
           attendeeId: attendeeId
          }
        })
        console.log(audience);
        API.createAudience(audience).then(
          res => {
            API.createLineup(this.state.lineup.map((artist, i) => {
              return {
                showId: showId,
                artistId: artist.artistId,
                isHeadliner: artist.isHeadliner,
                setlist: artist.setlist,
                sortOrder: i
              }
            })).then(
              this.resetState()
            )
          }
        )
      }
    )
  }

  // Render
  render() {
    const audienceSelectOptions=this.props.attendees && this.props.attendees.map(attendee => (
      {
        value: attendee.attendeeId,
        label: attendee.name
      }
    ))
    const artistSelectOptions=this.props.artists && this.props.artists.map(artist => (
      {
        value: artist.artistId,
        label: artist.artist
      }
    ))
    const venueSelectOptions=this.props.venues && this.props.venues.map(venue => (
      {
        value: venue.venueId,
        label: `${venue.venue} - ${venue.city}, ${venue.state ? venue.state : venue.country}`
      }
    ))
    return (
      <Form>
        <h2>Add A New Show</h2>
        <Row>
          <Col>
            <Row>
              <Col lg>
                {/* SHOW TITLE */}
                <Form.Group className="mb-2" controlId="showTitle">
                  <Form.Label>Title*</Form.Label>
                  <Form.Control type="text" name="title" onChange={e => this.handleShowChange(e)} />
                </Form.Group>
              </Col>
              <Col lg>
                {/* SHOW VENUE */}
                <Form.Group className="mb-2" controlId="showVenue">
                  <Form.Label>Venue*</Form.Label>
                  <Select key={this.state.newShow.venueId} 
                    name="venueId"
                    options={venueSelectOptions}
                    blurInputOnSelect={false}
                    closeMenuOnSelect={true}
                    closeMenuOnScroll={false}
                    isClearable={false}
                    isSearchable={true}
                    isMulti={false}
                    value={
                      this.state.newShow.venueId ? {
                        value: this.state.newShow.venueId,
                        label: venueSelectOptions.find(v => v.value === this.state.newShow.venueId).label
                      } : ""
                    }
                    onChange={e => this.handleVenueSelect(e)}
                  />
                  <Form.Text className="text-muted">
                    <a href="#" name="showVenueModal" onClick={e => this.showOrHideModal(e.target.name)}>Don't see the venue you need?</a>
                    <AddVenueModal 
                      show={this.state.showVenueModal} 
                      handleClose={this.showOrHideModal}
                      loadVenues={this.loadVenues}
                      venues={this.props.venues}
                    />
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            {/* DATES */}
            <Row>
              {/* START DATE */}
              <Col>
                <Form.Group className="mb-2" controlId="showStartDate">
                  <Form.Label>Start Date*</Form.Label>
                  <Form.Control type="date" name="startDate" onChange={e => this.handleShowChange(e)} />
                </Form.Group>
              </Col>
              {/* END DATE */}
              <Col>
                <Form.Group className="mb-2" controlId="showEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" name="endDate" onChange={e => this.handleShowChange(e)} />
                  <Form.Text className="text-muted">
                    Leave blank if one-day show
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col>
            {/* SHOW NOTES */}
            <Form.Group className="mb-2" controlId="showNotes">
              <Form.Label>Show Notes</Form.Label>
              <Form.Control as="textarea" rows={5} name="notes" onChange={e => this.handleShowChange(e)} />
              <Form.Text className="text-muted">
                Notes about the overall show, not setlists
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        {/* ARTISTS */}
        <h3 className="mb-2">Lineup</h3>
        <p className="text-muted"><small>List artists in the order they performed (e.g. the first opener will be Artist #1)</small></p>
        <Row>
          {this.state.lineup.map((artist, i) => {
            return <Col sm={6} md={4} key={i}>
              <h5>
                {`Artist #${i+1} `}
                {/* REMOVE AN ARTIST */}
                {i !== 0 && <i className="bi bi-x text-danger" onClick={e => this.removeArtistFromLineup(e, i)}></i>}
              </h5>
              {/* ARTIST NAME */}
              <Form.Group className="mb-1" controlId="showArtist">
                <Select key={artist.artistId} 
                  name="artistId"
                  options={artistSelectOptions}
                  blurInputOnSelect={false}
                  closeMenuOnSelect={true}
                  closeMenuOnScroll={false}
                  isClearable={false}
                  isSearchable={true}
                  isMulti={false}
                  value={
                    artist.artistId ? {
                      value: artist.artistId,
                      label: artistSelectOptions.find(a => a.value === artist.artistId).label
                    } : ""
                  }
                  onChange={e => this.handleArtistSelect(e, i)}
                />
                <Form.Text className="text-muted">
                  <a href="#" name="showArtistModal" onClick={e => this.showOrHideModal(e.target.name)}>Don't see the artist you need?</a>
                  <AddArtistModal 
                    show={this.state.showArtistModal} 
                    handleClose={this.showOrHideModal}
                    loadArtists={this.loadArtists}
                    artists={this.props.artists}
                  />
                </Form.Text>
              </Form.Group>
              {/* ARTIST HEADLINER */}
              <Form.Group className="mb-2" controlId="showHeadliner">
                <Form.Check inline type="checkbox" label="Headliner" name="isHeadliner" checked={artist.isHeadliner} onChange={e => this.handleHeadlinerChange(e, i)}/>
              </Form.Group>
              {/* ARTIST SETLIST */}
              <Form.Group className="mb-2" controlId="showSetlist">
                <Form.Label>Setlist</Form.Label>
                <Form.Control as="textarea" rows={3} name="setlist" value={artist.setlist || ""} onChange={e => this.handleLineupChange(e, i)}/>
              </Form.Group>
            </Col>
          })}
        </Row>
        {/* ADD AN ARTIST */}
        <a href="#placeholder" onClick={e => this.addArtistToLineup(e)}>Add another artist to the lineup</a>
        {/* AUDIENCE */}
        <h3 className="mb-2 mt-2">Audience</h3>
        <Form.Group className="mb-2" controlId="showSetlist">
          <Form.Label>Attendees</Form.Label>
          <Select name="audience"
            options={audienceSelectOptions}
            blurInputOnSelect={false}
            closeMenuOnSelect={false}
            closeMenuOnScroll={false}
            isClearable={false}
            isSearchable={true}
            isMulti={true}
            value={this.state.selectedAudience}
            onChange={this.handleAudienceChange}
          />
          <Form.Text className="text-muted">
            <a href="#" name="showAttendeeModal" onClick={e => this.showOrHideModal(e.target.name)}>Don't see the person you need?</a>
            <AddAttendeeModal 
              show={this.state.showAttendeeModal} 
              handleClose={this.showOrHideModal}
              loadAttendees={this.loadAttendees}
              attendees={this.props.attendees}
            />
          </Form.Text>
        </Form.Group>
        <Button variant="primary" className="float-end" onClick={() => this.createNewShow()}>
          Create Show
        </Button>
      </Form>
    )
  }
}

export default AddShowForm;