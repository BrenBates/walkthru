const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaHouse = new Schema(
  {
    headline: { type: String },
    houseImageURL: { type: String },
    street: { type: String, required: true },
    city: { type: String, required: true },
    st: { type: String, required: true },
    zip: { type: Number, required: true },
    lat: { type: Number },
    long: { type: Number },
    forRent: {type: Boolean},
    forSale: { type: Boolean },
    date: { type: Date, default: Date.now }
    // rating
    // zillow url
    // rentler.com url
    // 
  }
);

const House = mongoose.model("House", schemaHouse);

module.exports = House;
