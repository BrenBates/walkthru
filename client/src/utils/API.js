import axios from "axios";

export default {
    // GETS ALL BOOKS
    getHouse: function() {
        return axios.get("/api/houses")
    },
    // GETS THE HOUSE WITH THE GIVEN ID
    getHouse: function(id) {
        return axios.get("/api/books/" +id);
    },
    // SAVES THE HOUSE TO THE DATABASE
    saveHouse: function(houseData) {
        return axios.post("/api/houses", houseData);
    }
};