import React, { Component } from "react";
import API from "../utils/API";
import {Container, Row, Col} from 'react-bootstrap';
import ShowsTable from "../components/ShowsTable";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  componentDidMount() {
    API.getShows().then(
      res => {
        this.setState({shows: res.data});
      }
    )
  }
  
  render() {
    return (
      <Container className="p-2">
        <Row>
          <Col />
          <Col lg={9} xl={8} xxl={7}>
            {this.state.shows && 
            <ShowsTable 
              shows={this.state.shows}/>
            }
          </Col>
          <Col />
        </Row>
      </Container> 
    )
  }
}

export default Home;