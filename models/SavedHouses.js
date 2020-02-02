const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaSavedHouses = new Schema(
  {
    houseID: { type: String },
    headline: { type: String },
    houseImageURL: { type: String },
    street: { type: String, required: true },
    city: { type: String, required: true },
    st: { type: String, required: true },
    zip: { type: Number, required: true },
    lat: { type: Number },
    long: { type: Number },
    date: { type: Date, default: Date.now },
      
  }
);

const SavedHouses = mongoose.model("SavedHouses", schemaSavedHouses);

module.exports = SavedHouses;
