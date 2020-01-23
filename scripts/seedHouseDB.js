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
    headline: "Two Row Brewery",
    houseImageURL: "",
    street:"6856 S 300 W",
    city:"Midvale",
    state:"UT",
    zip: 84047,
    lat: 40.626800,
    long: -111.900030,
    date: new Date(Date.now())
  },
  {
    headline: "Shades Brewing",
    houseImageURL: "",
    street:"154 W Utopia Ave",
    city:"South Salt Lake",
    state:"UT",
    zip: 84115,
    lat: 40.723790,
    long: -111.894360,
    date: new Date(Date.now())
  },
  {
    headline: "Roosters",
    houseImageURL: "",
    street:"748 Heritage Park Blvd",
    city:"Layton",
    state:"UT",
    zip: 84041,
    lat: 41.083440,
    long: -111.978870,
    date: new Date(Date.now())
  }
  ,
  {
    headline: "Bohemian Brewery",
    houseImageURL: "",
    street:"94 Fort Union Blvd",
    city:"Midvale",
    state:"UT",
    zip: 84047,
    lat: 40.620320,
    long: -111.888270,
    date: new Date(Date.now())
  },
  {
    headline: "Red Rock Brewing",
    houseImageURL: "",
    street:"254 S 200 W",
    city:"Salt Lake City",
    state:"UT",
    zip: 84101,
    lat: 40.763650,
    long: -111.897240,
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
