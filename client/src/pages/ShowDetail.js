import React, { Component, Fragment } from "react";
import API from "../utils/API";
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import ShowDetailsView from "../components/Views/ShowDetailsView";

const ShowDetail = () => {
  return(
    <Container className="p-3">
      <Row>
        <Col>
          <ShowDetailsView 
            params={useParams()}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default ShowDetail;