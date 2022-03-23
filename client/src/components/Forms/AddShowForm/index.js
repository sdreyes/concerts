import React, {Component, Fragment} from "react";
import { Form, Button, InputGroup, Col, Row } from 'react-bootstrap';

class AddShowForm extends Component {
  constructor(props) {
    super(props);
    this.loadShows = this.props.loadShows.bind(this);
    this.loadVenues = this.props.loadVenues.bind(this);
    this.loadArtists = this.props.loadArtists.bind(this);
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
      audience: [{
        showId: null,
        attendeeId: 1
      },
      {
        showId: null,
        attendeeId: 2
      }]
    };
  };
  // Component Mounted
  componentDidMount() {
    console.log(this.props.artists);
    console.log(this.props.venues);
  }

  handleShowChange(e) {
    this.setState(prevState => {
      let newShow = Object.assign({}, prevState.newShow);
      newShow[e.target.name] = e.target.value;
      return { newShow };
    }, () => {
      console.log(this.state.newShow);
    })
  }

  handleLineupChange(e, i) {
    this.setState(prevState => {
      let newLineup = Object.assign({}, prevState.lineup);
      newLineup[i][e.target.name] = e.target.value;
      return { newLineup };
    }, () => {
      console.log(this.state.newLineup);
    });
  };

  handleHeadlinerChange(e, i) {
    this.setState(prevState => {
      let newLineup = Object.assign({}, prevState.lineup);
      newLineup[i][e.target.name] = e.target.checked;
      return { newLineup };
    }, () => {
      console.log(this.state.newLineup);
    });
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
    });
  };

  removeArtistFromLineup(e, i) {
    e.preventDefault();
    console.log(`index ${i}`);
    var newLineup = [...this.state.lineup];
    console.log(newLineup);
    newLineup.splice(i, 1);
    console.log(newLineup);
    this.setState({lineup: newLineup});
  };

  // Render
  render() {
    return (
      <Form>
        <h1>Add New Show</h1>
        {/* SHOW TITLE */}
        <Form.Group className="mb-2" controlId="showTitle">
          <Form.Label>Title*</Form.Label>
          <Form.Control type="text" name="title" onChange={e => this.handleShowChange(e)} />
        </Form.Group>
        {/* SHOW VENUE */}
        <Form.Group className="mb-2" controlId="showVenue">
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
            <Form.Group className="mb-2" controlId="showStartDate">
              <Form.Label>Start Date*</Form.Label>
              <Form.Control type="date" name="startDate" onChange={e => this.handleShowChange(e)} />
            </Form.Group>
          </Col>
          {/* END DATE */}
          <Col xs={6} md={4} lg={3} xl={2}>
            <Form.Group className="mb-2" controlId="showEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" name="endDate" onChange={e => this.handleShowChange(e)} />
              <Form.Text className="text-muted">
                Leave blank if one-day show
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        {/* SHOW NOTES */}
        <Form.Group className="mb-2" controlId="showNotes">
          <Form.Label>Show Notes</Form.Label>
          <Form.Control as="textarea" rows={3} name="notes" onChange={e => this.handleShowChange(e)} />
          <Form.Text className="text-muted">
            Notes about the overall show, not setlists
          </Form.Text>
        </Form.Group>
        {/* ARTISTS */}
        <h3 className="mb-2">Lineup</h3>
        {this.state.lineup.map((artist, i) => {
          return <Fragment key={i}>
            <h5>
              {`Artist #${i+1} `}
              {/* REMOVE AN ARTIST */}
              {i !== 0 && <Button variant="danger" size="sm" onClick={e => this.removeArtistFromLineup(e, i)}>X</Button>}
            </h5>
            {/* ARTIST NAME */}
            <Form.Group className="mb-1" controlId="showArtist">
              <Form.Select name="artistId" value={artist.artistId || ""} onChange={e => this.handleLineupChange(e, i)}>
              <option value="">-- Select an Artist --</option>
                {this.props.artists && this.props.artists.map(artist => {
                  return <option 
                  key={artist.artistId} 
                  value={artist.artistId}>
                    {artist.artist}
                  </option>
                })}
              </Form.Select>
              <Form.Text className="text-muted">
                <a href="#placeholder">Don't see the artist you need?</a>
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
          </Fragment>
        })}
        {/* ADD AN ARTIST */}
        <a href="#placeholder" onClick={e => this.addArtistToLineup(e)}>Add another artist to the lineup</a>
        {/* AUDIENCE */}
        <h3 className="mb-2">Audience</h3>
        
      </Form>
    )
  }
}

export default AddShowForm;