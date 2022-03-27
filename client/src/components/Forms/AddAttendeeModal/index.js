import React, { Component } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import API from "../../../utils/API";

class AddAttendeeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attendee: {
        name: null,
        notes: null
      },
      attendeeAlreadyExists: false,
      dupes: []
    };
  }

  attendeeAlreadyExists = (newAttendeeName) => {
    console.log("checking...")
    let dupes = this.props.attendees.filter(attendee => newAttendeeName === attendee.name);
    console.log(dupes);
    this.setState({
      attendeeAlreadyExists: dupes.length !== 0,
      dupes: dupes
    }, () => console.log(this.state))
  }

  handleAttendeeChange(e) {
    let attendee = {...this.state.attendee}
    attendee[e.target.name] = e.target.value;
    if (e.target.name === "name") this.attendeeAlreadyExists(e.target.value);
    this.setState({attendee}, () => console.log(this.state));
    /*check if attendee already exists if it's a name change */
  }

  createNewAttendee = () => {
    API.createAttendee(this.state.attendee).then(
      res => {
        this.props.loadAttendees()
        this.props.handleClose("showAttendeeModal")
        this.resetState();
      }
    )
  }

  resetState = () => {
    this.setState({
      attendee: {
        name: "",
        notes: ""
      },
      attendeeAlreadyExists: false,
      dupes: []
    })
  }

  render() {
    return(
      <Modal show={this.props.show} size="lg" onHide={e => {
        this.resetState();
        this.props.handleClose("showAttendeeModal")}
      }>
        <Modal.Header>
          <Modal.Title>Create a New Attendee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="attendeeName">
              <Form.Label>Attendee*</Form.Label>
              <Form.Control type="text" name="name" onChange={e => this.handleAttendeeChange(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control type="text" name="notes" onChange={e => this.handleAttendeeChange(e)} />
              <Form.Text className="text-muted">
                If this person could be confused with different one, add notes to indicate the difference
              </Form.Text>
            </Form.Group>
            {this.state.attendeeAlreadyExists && <Alert variant="warning">
              There is already an entry for {this.state.attendee.name}. Are you sure you want to continue?
              <br /><br />
              <strong>Possible matches:</strong>
              <ul>
                {this.state.dupes.map(dupe => <li key={dupe.attendeeId}>{dupe.name} - {dupe.notes ? dupe.notes : `No additional details available`}</li>)}
              </ul>
            </Alert>}
            <Button variant="primary" className="float-end" onClick={() => this.createNewAttendee()}>
              Create Attendee
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default AddAttendeeModal;