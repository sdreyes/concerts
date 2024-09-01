import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import AttendeeDetailsView from "../components/Views/AttendeeDetailsView";

const Attendee = () => {
  return(
    <Container className="p-3">
      <Row>
        <Col />
        <Col lg={9} xl={8} xxl={7}>
          <AttendeeDetailsView 
            params={useParams()}
          />
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default Attendee;