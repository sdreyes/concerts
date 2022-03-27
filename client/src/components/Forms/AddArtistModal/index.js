import React, { Component } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import API from "../../../utils/API";

class AddArtistModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: {
        artist: null,
        notes: null
      },
      artistAlreadyExists: false,
      dupes: []
    };
  }

  artistAlreadyExists = (newArtistName) => {
    console.log("checking...")
    let dupes = this.props.artists.filter(artist => newArtistName === artist.artist);
    console.log(dupes);
    if (dupes.length) {
      this.setState({
        artistAlreadyExists: true,
        dupes: dupes
      })
    } else {
      this.setState({
        artistAlreadyExists: false,
        dupes: dupes
      }, () => console.log(this.state))
    }
  }

  handleArtistChange(e) {
    let artist = {...this.state.artist}
    artist[e.target.name] = e.target.value;
    if (e.target.name === "artist") this.artistAlreadyExists(e.target.value);
    this.setState({artist}, () => console.log(this.state));
    /*check if artist already exists if it's a name change */
  }

  createNewArtist = () => {
    API.createArtist(this.state.artist).then(
      res => {
        this.props.loadArtists()
        this.props.handleClose("showArtistModal")
        this.setState({
          artist: {
            artist: {
              artist: "",
              notes: ""
            },
            artistAlreadyExists: false,
            dupes: []
          }
        })
      }
    )
  }

  resetState = () => {
    this.setState({
      artist: {
        artist: "",
        notes: ""
      },
      artistAlreadyExists: false,
      dupes: []
    })
  }

  render() {
    return(
      <Modal show={this.props.show} size="lg" onHide={e => {
        this.resetState();
        this.props.handleClose("showArtistModal")}
      }>
        <Modal.Header>
          <Modal.Title>Create a New Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="artist">
              <Form.Label>Artist*</Form.Label>
              <Form.Control type="text" name="artist" onChange={e => this.handleArtistChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control type="text" name="notes" onChange={e => this.handleArtistChange(e)} />
              <Form.Text className="text-muted">
                If this artist could be confused with another artist, add notes to indicate the difference
              </Form.Text>
            </Form.Group>
            {this.state.artistAlreadyExists && <Alert variant="warning">
              There is already an entry for {this.state.artist.artist}. Are you sure you want to continue?
              <br /><br />
              <strong>Possible matches:</strong>
              <ul>
                {this.state.dupes.map(dupe => <li key={dupe.artistId}>{dupe.artist} - {dupe.notes ? dupe.notes : `No additional details available`}</li>)}
              </ul>
            </Alert>}
            <Button variant="primary" className="float-end" onClick={() => this.createNewArtist()}>
              Create Artist
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default AddArtistModal;