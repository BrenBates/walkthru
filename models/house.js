const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaHouse = new Schema(
  {
    headline: { type: String },
    houseImage: { type: String },
    price: { type: String },
    beds: { type: String },
    baths: { type: String },
    squareFeet: { type: String },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true }
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

const House = mongoose.model("House", houseSchema);

module.exports = House;
