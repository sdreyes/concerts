import axios from "axios";

const API = {
  getShows: function () {
    console.log("Getting shows...");
    return axios.get("/api/shows");
  },
  getShowDetails: function(showId) {
    console.log("getting show details...");
    console.log("/api/shows/" + showId);
    return axios.get("/api/shows/" + showId);
  },
  getAttendeeDetails: function(attendeeId) {
    console.log("getting attendee details...");
    console.log("/api/attendees/" + attendeeId);
    return axios.get("/api/attendees/" + attendeeId);
  },
  getArtists: function() {
    console.log("Getting artists...");
    return axios.get("/api/artists");
  },
  getVenues: function() {
    console.log("Getting venues...");
    return axios.get("/api/venues");
  },
  getAttendees: function() {
    console.log("Getting attendees...");
    return axios.get("/api/attendees");
  },
  createVenue: function(data) {
    return axios.post("/api/venues", data);
  },
  createArtist: function(data) {
    return axios.post("/api/artists", data);
  },
  createAttendee: function(data) {
    return axios.post("/api/attendees", data);
  },
  createShow: function(data) {
    return axios.post("/api/shows", data);
  },
  createAudience: function(data) {
    return axios.post("/api/audience", data);
  },
  createLineup: function(data) {
    return axios.post("/api/lineup", data);
  },
}

export default API;