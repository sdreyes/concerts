import React, { Component, Fragment } from "react";
import API from "../utils/API";
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import AttendeeDetailsView from "../components/Views/AttendeeDetailsView";

const Attendee = () => {
  return(
    <Container className="p-3">
      <Row>
        <Col>
          <AttendeeDetailsView 
            params={useParams()}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Attendee;