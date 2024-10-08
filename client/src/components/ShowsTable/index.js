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
      monthFilters: [],
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
      case 'Month':
        this.setState({
          monthFilters: values.map(a => a.value)
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
    let attendeeFilters = this.state.attendeeFilters;
    let monthFilters = this.state.monthFilters;
    let yearFilters = this.state.yearFilters;
    // ======= ARTISTS =======
    // Get a list of the indexes of any shows that contain the selected artist filters
    console.log("filtering artists...");
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
    });
    // ======= VENUES =======
    console.log("filtering venues...");
    let showIndexesForVenueFilters = [];
    this.state.shows.forEach(function(show, index) {
      // If no venue filters, include all venues
      if(venueFilters.length === 0) {
        showIndexesForVenueFilters.push(index);
      // If the show venue is included in the list of venue filters, push it to the index arr
      } else if (venueFilters.includes(show.location.venueId)) {
        showIndexesForVenueFilters.push(index);
      };
    });
    // ======= ATTENDEES =======
    console.log("filtering attendees...");
    // Get a list of the indexes of any shows that contain the selected attendee filters
    let showIndexesForAttendeeFilters = [];
    this.state.shows.forEach(function(show, index) { 
      // If no attendee filters, inclue all attendees
      if (attendeeFilters.length === 0) {
        showIndexesForAttendeeFilters.push(index);
      } else if (
        // If at least one of the attendees includes an attendeeFilter, push it to the index arr
        show.attendees.some(
          attendee => attendeeFilters.includes(attendee.attendeeId)
        )
      ) {
        showIndexesForAttendeeFilters.push(index);
      };
    });
    // ======= MONTHS =======
    console.log("filtering months...");
    let showIndexesForMonthFilters = [];
    this.state.shows.forEach(function(show, index) {
      // If no month filters, include all months
      if(monthFilters.length === 0) {
        showIndexesForMonthFilters.push(index);
      // If the show month is included in the list of month filters, push it to the index arr
      } else if (monthFilters.includes(moment(show.startDate).month())) {
        showIndexesForMonthFilters.push(index);
      };
    });
    // ======= YEARS =======
    console.log("filtering years...");
    let showIndexesForYearFilters = [];
    this.state.shows.forEach(function(show, index) {
      // If no year filters, include all years
      if(yearFilters.length === 0) {
        showIndexesForYearFilters.push(index);
      // If the show year is included in the list of year filters, push it to the index arr
      } else if (yearFilters.includes(moment(show.startDate).year())) {
        showIndexesForYearFilters.push(index);
      };
    });
    // Intersection?
    let intersection = _.intersection(
      showIndexesForArtistFilters, 
      showIndexesForVenueFilters,
      showIndexesForAttendeeFilters,
      showIndexesForMonthFilters,
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
                    <a 
                      className="link-dark" 
                      href={`/show/${show.showId}`} 
                      title={show.artistLineup.map(artist => artist.artist).join('\n')}
                    >
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