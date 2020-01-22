const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/walkthru"
);


// headline: { type: String },
// houseImageURL: { type: String },
// street: { type: String, required: true },
// city: { type: String, required: true },
// state: { type: String, required: true },
// zip: { type: Number, required: true },
// lat: { type: Number },
// long: { type: Number }


const houseSeed = [
  {
    headline: "The Dead Zone",
    houseImageURL: "Stephen King",
    street:"Vine",
    city:"Kearns",
    state:"UT",
    zip: 84118,
    lat: 123,
    long: 456,
    date: new Date(Date.now())
  },
  {
    headline: "The Hood",
    houseImageURL: "Stephen King",
    street:"Elm",
    city:"Wazoo",
    state:"TX",
    zip: 84123,
    lat: 789,
    long: 890,
    date: new Date(Date.now())
  }
];

db.House
  .remove({})
  .then(() => db.House.collection.insertMany(houseSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
