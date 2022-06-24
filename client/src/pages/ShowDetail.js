import React, { Component, Fragment } from "react";
import API from "../utils/API";
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";


const ShowDetail = () => {

  const {showId} = useParams();
  let show = {};
  console.log("The showId is:")
  console.log(showId);
  API.getShowDetails(parseInt(showId))
    .then(res => {
      show = res.data;
      console.log(res);
      // this.setState({ show: res.data })
    })
    .catch(err => console.log(err));

  return(
    <Container className="p-3">
      <Row>
        <Col>
          <h1>{show.title}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default ShowDetail;