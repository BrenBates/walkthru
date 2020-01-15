const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/walkthru"
);

const userSeed = [
  {
    userName: "Billy Bob",
    password: "BobBob",
    date: new Date(Date.now())
  },
  
  {
    userName: "TrevorNoah",
    password: "dailyshow123",
    date: new Date(Date.now())
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
