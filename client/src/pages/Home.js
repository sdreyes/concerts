import React, { Component, Fragment } from "react";
import API from "../utils/API";

class Home extends Component {
  state = {
    shows: []
  }

  componentDidMount() {
    console.log("Component mounted");
    this.loadShows();
  }

  loadShows = () => {
    API.getShows().then(
      res => {
        console.log(res.data);
        this.setState({shows: res.data})
      }
    )
  }
  render() {
    return (
      <Fragment>
        { 
        this.state.shows ? 
          <ul>
            {this.state.shows.map(show => <li key={show.showId}>{show.title}</li>)}
          </ul>
          : <h1>No shows</h1>
        }
      </Fragment> 
    )
  }
}

export default Home;