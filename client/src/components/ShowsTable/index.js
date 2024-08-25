import React, {Component, Fragment} from "react";
import { Table } from 'react-bootstrap';
import moment from 'moment';
import ShowFilters from "../ShowFilters";
import _ from 'underscore';

class ShowsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      shows: this.props.shows,
      filteredShows: this.props.shows,
      artistFilters: [],
      venueFilters: [],
      attendeeFilters: [],
      tagFilters: [],
      yearFilters: []
    }
  }
  // Component Mounted
  componentDidMount() {
    this.setState({
      shows: this.props.shows,
      filteredShows: this.props.shows
    });
  }
  // Handle Filter Change
  handleFilterChange = (values, type) => {
    switch(type) {
      case 'Artist':
        this.setState({
          artistFilters: values.map(a => a.value)
        }, () => this.filterShows());
        return;
      case 'Venue':
        this.setState({
          venueFilters: values.map(a => a.value)
        }, () => this.filterShows());
        return;
      case 'Attendee':
        this.setState({
          attendeeFilters: values.map(a => a.value)
        }, () => this.filterShows());
        return;
      case 'Tag':
        this.setState({
          tagFilters: values.map(a => a.value)
        }, () => this.filterShows());
        return;
        case 'Year':
          this.setState({
            yearFilters: values.map(a => a.value)
          }, () => this.filterShows());
          return;
      default:
        return;
    };
  };

  // Filter Shows Function
  filterShows = () => {
    let artistFilters = this.state.artistFilters;
    let venueFilters = this.state.venueFilters;
    let yearFilters = this.state.yearFilters;
    // ======= ARTISTS =======
    // Get a list of the indexes of any shows that contain the selected artist filters
    let showIndexesForArtistFilters = [];
    this.state.shows.forEach(function(show, index) { 
      // If no artist filters, inclue all artists
      if (artistFilters.length === 0) {
        showIndexesForArtistFilters.push(index);
      } else if (
        // If at least one of the lineup includes an artistFilter, push it to the index arr
        show.artistLineup.some(
          artist => artistFilters.includes(artist.artistId)
        )
      ) {
        showIndexesForArtistFilters.push(index);
      };
    })
    // ======= VENUES =======
    let showIndexesForVenueFilters = [];
    this.state.shows.forEach(function(show, index) {
      // If no venue filters, include all venues
      if(venueFilters.length === 0) {
        showIndexesForVenueFilters.push(index);
      // If the show venue is included in the list of venue filters, push it to the index arr
      } else if (venueFilters.includes(show.location.venueId)) {
        showIndexesForVenueFilters.push(index);
      };
    })
    // ======= YEARS =======
    let showIndexesForYearFilters = [];
    this.state.shows.forEach(function(show, index) {
      // If no year filters, include all years
      if(yearFilters.length === 0) {
        showIndexesForYearFilters.push(index);
      // If the show year is included in the list of year filters, push it to the index arr
      } else if (yearFilters.includes(moment(show.startDate).year())) {
        showIndexesForYearFilters.push(index);
      };
    })
    // Intersection?
    let intersection = _.intersection(
      showIndexesForArtistFilters, 
      showIndexesForVenueFilters,
      showIndexesForYearFilters
    );
    this.setState({
      filteredShows: intersection.map(i => this.state.shows[i])
    });
  };

  render() {
    return (
      this.state.filteredShows && <Fragment>
        <ShowFilters 
          handleFilterChange={this.handleFilterChange}
          filterShows={this.filterShows}
        />
        {`${this.state.filteredShows.length} ${this.state.filteredShows.length === 1 ? "show" : "shows"}!`}
        <Table striped bordered>
          <thead>
            <tr>
              <th>Date</th>
              <th>Show</th>
              <th>Venue</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredShows.map(show => {
              return (
                <tr key={show.showId}>
                  <td>{moment(show.startDate).format("MM/DD/YYYY")}</td>
                  <td>
                    <a className="link-dark" href={`/show/${show.showId}`}>
                      {show.title}
                    </a>
                  </td>
                  <td>
                    {show.location.venue}
                    <br/>
                    <small>{`${show.location.city}, ${show.location.state ? show.location.state : show.location.country}`}</small>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}

export default ShowsTable;