import React, {Component, Fragment} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navigation from "./components/Navigation"
import AddShow from "./pages/AddShow.js"
import Home from "./pages/Home.js"
import API from "./utils/API";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      artists: [],
      shows: []
    }
    this.loadShows = this.loadShows.bind(this)
  }
  // Component Mounted
  componentDidMount() {
    this.loadArtists();
    this.loadVenues();
    this.loadShows();
  }
  // Load Artists
  loadArtists = () => {
    API.getArtists().then(
      res => {
        this.setState({artists: res.data});
      }
    )
  }
  // Load Venues
  loadVenues = () => {
    API.getVenues().then(
      res => {
        // console.log(res.data);
        this.setState({venues: res.data});
      }
    )
  }
  // Load Shows
  loadShows = () => {
    API.getShows().then(
      res => {
        this.setState({shows: res.data});
      }
    )
  }
  // Render
  render() {
    return (
      <Fragment>
        <Navigation />
        <Router>
          <Routes>
            <Route path="/" element={
              <Home 
                shows={this.state.shows} 
                loadShows={this.loadShows} 
              />}
            />
            {process.env.NODE_ENV !== "production" && 
              <Route path="/addshow" element={
                <AddShow 
                  shows={this.state.shows}
                  venues={this.state.venues}
                  artists={this.state.artists}
                  loadShows={this.loadShows}
                  loadArtists={this.loadArtists}
                  loadVenues={this.loadVenues}
                />}
              />}
          </Routes>
        </Router>
      </Fragment>
    );
  }
}

export default App;
