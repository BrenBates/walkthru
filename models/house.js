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
    forSale: { type: Boolean }
  }
);

const House = mongoose.model("House", schemaHouse);

module.exports = House;
