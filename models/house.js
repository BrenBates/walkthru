const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaHouse = new Schema(
  {
    headline: { type: String },
    houseImageURL: { type: String },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    lat: { type: Number },
    long: { type: Number }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual populate
schemaHouse.virtual("comments", {
  ref: "Comment",
  foreignField: "houseRef",
  localField: "_id"
});

const House = mongoose.model("House", schemaHouse);

module.exports = House;
