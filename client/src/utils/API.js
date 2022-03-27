import axios from "axios";

const API = {
  getShows: function () {
    console.log("Getting shows...");
    return axios.get("/api/shows");
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
  }
}

export default API;