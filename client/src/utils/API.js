import axios from "axios";

const API = {
  getShows: function () {
    console.log("Getting shows...");
    return axios.get("/api/shows");
  }
}

export default API;