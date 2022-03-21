import React, {Component} from "react";
import { Form, Button, InputGroup, Col, Row } from 'react-bootstrap';

class AddShowForm extends Component {
  constructor(props) {
    super(props)
    this.loadShows = this.props.loadShows.bind(this)
    this.loadVenues = this.props.loadVenues.bind(this)
    this.loadArtists = this.props.loadArtists.bind(this)
    this.state={
      newShow: {
        title: "",
        venueId: null,
        startDate: null,
        endDate: null,
        notes: ""
      },
      lineup: [],
      audience: []
    }
  }
  // Component Mounted
  componentDidMount() {
    console.log(this.props.artists)
    console.log(this.props.venues)
  }

  handleShowChange(e) {
    // ...
    this.setState(prevState => {
      let newShow = Object.assign({}, prevState.newShow);
      newShow[e.target.name] = e.target.value;
      return { newShow }
    }, () => {
      console.log(this.state.newShow);
    })
  }

  // Render
  render() {
    return (
      <Form>
        <h1>Add New Show</h1>
        {/* SHOW TITLE */}
        <Form.Group className="mb-3" controlId="showTitle">
          <Form.Label>Title*</Form.Label>
          <Form.Control type="text" name="title" onChange={e => this.handleShowChange(e)} />
        </Form.Group>
        {/* SHOW VENUE */}
        <Form.Group className="mb-3" controlId="showVenue">
          <Form.Label>Venue*</Form.Label>
          <Form.Select name="venueId" onChange={e => this.handleShowChange(e)}>
            <option value="">-- Select a Venue --</option>
            {this.props.venues && this.props.venues.map(venue => {
              return <option 
              key={venue.venueId} 
              value={venue.venueId}>
                {`${venue.venue} - ${venue.city},
                ${venue.state ? venue.state : venue.country}`}
              </option>
            })}
          </Form.Select>
          <Form.Text className="text-muted">
            <a href="#placeholder">Don't see the venue you need?</a>
          </Form.Text>
        </Form.Group>
        {/* DATES */}
        <Row>
          {/* START DATE */}
          <Col xs={6} md={4} lg={3} xl={2}>
            <Form.Group className="mb-3" controlId="showStartDate">
              <Form.Label>Start Date*</Form.Label>
              <Form.Control type="date" name="startDate" onChange={e => this.handleShowChange(e)} />
            </Form.Group>
          </Col>
          {/* END DATE */}
          <Col xs={6} md={4} lg={3} xl={2}>
            <Form.Group className="mb-3" controlId="showEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" onChange={e => this.handleShowChange(e)} />
              <Form.Text className="text-muted">
                Leave blank if one-day show
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        {/* SHOW NOTES */}
        <Form.Group className="mb-3" controlId="showNotes">
          <Form.Label>Show Notes</Form.Label>
          <Form.Control as="textarea" rows={3} name="notes" onChange={e => this.handleShowChange(e)} />
          <Form.Text className="text-muted">
            Notes about the overall show, not setlists
          </Form.Text>
        </Form.Group>
        {/* ARTISTS */}
        <h3 className="mb-3">Lineup</h3>
          {/* ARTIST NAME */}
        <Form.Group className="mb-1" controlId="showArtist">
          <Form.Label>Artist</Form.Label>
          <Form.Select name="artist"> {/*NEEDS ON CHANGE*/}
          <option value="">-- Select an Artist --</option>
            {this.props.artists && this.props.artists.map(artist => {
              return <option 
              key={artist.artistId} 
              value={artist.artistId}>
                {artist.artist}
              </option>
            })}
          </Form.Select>
        </Form.Group>
        {/* ARTIST HEADLINER */}
        <Form.Group className="mb-3" controlId="showHeadliner">
          <Form.Check inline type="checkbox" label="Headliner" name="headliner" />{/*NEEDS ON CHANGE*/}
        </Form.Group>
        {/* ARTIST SETLIST */}
        <Form.Group className="mb-3" controlId="showSetlist">
          <Form.Label>Setlist</Form.Label>
          <Form.Control as="textarea" rows={3} name="setlist" />{/*NEEDS ON CHANGE*/}
        </Form.Group>
      </Form>
    )
  }
}

export default AddShowForm;