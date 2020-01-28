const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://user:password1@ds213529.mlab.com:13529/heroku_m9wjw5ll"
);

const houseSeed = [
  {
    headline: "Two Row Brewery",
    houseImageURL: "https://utahbeernews.com/wp-content/uploads/2018/08/2-Row-Brewing-Cold-Beer-Fridge.jpg",
    street:"6856 S 300 W",
    city:"Midvale",
    state:"UT",
    zip: 84047,
    lat: 40.626800,
    long: -111.900030,
    forRent: false,
    forSale: true,
    date: new Date(Date.now())
  },
  {
    headline: "Shades Brewing",
    houseImageURL: "http://craftybeergirls.com/wp-content/uploads/2016/07/IMG_9408.jpg",
    street:"154 W Utopia Ave",
    city:"South Salt Lake",
    state:"UT",
    zip: 84115,
    lat: 40.723790,
    long: -111.894360,
    forRent: false,
    forSale: true,
    date: new Date(Date.now())
  },
  {
    headline: "Roosters",
    houseImageURL: "https://s3-media0.fl.yelpcdn.com/bphoto/MlJLm2ycI7sghPmJbhRZjw/l.jpg",
    street:"748 Heritage Park Blvd",
    city:"Layton",
    state:"UT",
    zip: 84041,
    lat: 41.083440,
    long: -111.978870,
    forRent: false,
    forSale: true,
    date: new Date(Date.now())
  }
  ,
  {
    headline: "Bohemian Brewery",
    houseImageURL: "https://images.squarespace-cdn.com/content/v1/54db986de4b0936f278fbbe2/1430270162279-B5GNTSIID2G7K5RA05R1/ke17ZwdGBToddI8pDm48kIqRQ-d4uWamJ2VXs6EINVJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UW2VFxxdTm_s5vtOOMhwEXVaY8l0hOBIHC7AzZhBh58kEEaCUOPFMaQrUb6f8fLjUQ/Boho+Restaurant+interior_new.jpg?format=2500w",
    street:"94 Fort Union Blvd",
    city:"Midvale",
    state:"UT",
    zip: 84047,
    lat: 40.620320,
    long: -111.888270,
    forRent: true,
    forSale: false,
    date: new Date(Date.now())
  },
  {
    headline: "Red Rock Brewing",
    houseImageURL: "http://redrockbrewing.com/wp-content/uploads/2013/08/Downtown-Slider.jpg",
    street:"254 S 200 W",
    city:"Salt Lake City",
    state:"UT",
    zip: 84101,
    lat: 40.763650,
    long: -111.897240,
    forRent: false,
    forSale: true,
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
