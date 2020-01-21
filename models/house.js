const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaHouse = new Schema(
  {
    name: { type: String }
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
