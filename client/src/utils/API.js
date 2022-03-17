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
  }
}

export default API;