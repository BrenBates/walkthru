const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/walkthru"
);


const userSeed = [
  {
    username: "Billy Bob",
    email: "jimbob@farmersonly.com",
    password: "BobBob",
    userImage: 'https://cdn.images.express.co.uk/img/dynamic/79/590x/secondary/Emilia-Clarke-Game-Of-Thrones-Instagram-pictures-new-dog-puppy-2270102.jpg?r=1579617194786',
    date: new Date(Date.now())
  },
  {
    username: "Rick",
    email: "rick@rickandmorty.com",
    password: "abc123",
    userImage: 'https://cdn.images.express.co.uk/img/dynamic/79/590x/secondary/Emilia-Clarke-Game-Of-Thrones-Instagram-pictures-new-dog-puppy-2270102.jpg?r=1579617194786',
    date: new Date(Date.now())
  },
  {
    username: "Morty",
    email: "rick@rickandmorty.com",
    password: "abc123",
    userImage: 'https://cdn.images.express.co.uk/img/dynamic/79/590x/secondary/Emilia-Clarke-Game-Of-Thrones-Instagram-pictures-new-dog-puppy-2270102.jpg?r=1579617194786',
    date: new Date(Date.now())
  },
  {
    username: "Athena",
    email: "athena@greekgoddess.com",
    password: "thisismydogsname",
    userImage: 'https://cdn.images.express.co.uk/img/dynamic/79/590x/secondary/Emilia-Clarke-Game-Of-Thrones-Instagram-pictures-new-dog-puppy-2270102.jpg?r=1579617194786',
    date: new Date(Date.now())
  },
  {
    username: "Artemis",
    email: "artemis@greekgoddess.com",
    password: "thisismydogsname",
    userImage: 'https://cdn.images.express.co.uk/img/dynamic/79/590x/secondary/Emilia-Clarke-Game-Of-Thrones-Instagram-pictures-new-dog-puppy-2270102.jpg?r=1579617194786',
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
