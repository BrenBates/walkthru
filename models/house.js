const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// title: headline, author: imageURL, synopsis: price, date: date
const houseSchema = new Schema({
  headline: { type: String, required: true },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  sqft: { type: Number, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
