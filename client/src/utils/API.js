import axios from "axios";

export default {

  // Gets all books
  getHouses: function() {
    return axios.get("/api/houses");
  },
  // Gets the book with the given id
  getHouse: function(id) {
    return axios.get("/api/houses/" + id);
  },
  // Deletes the book with the given id
  deleteHouse: function(id) {
    return axios.delete("/api/houses/" + id);
  },
  // Saves a book to the database
  saveHouse: function(houseData) {
    return axios.post("/api/houses", houseData);
  }
};
