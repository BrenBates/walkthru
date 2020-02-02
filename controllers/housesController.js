const db = require("../models");

// Defining methods for the housesController
module.exports = {
  // House.findOne().populate('comments').exec(function(error, user) {
  //   for (let i = 0; i < user.comments.length; i++) {
  //     const element = user.comments[i];
  //     console.log('element ', element);    }
  // });
  findAll: function(req, res) {
    console.log('houses findAll');
    db.House
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log('houses findById');
    
    db.House
      .findById(req.params.id)
      .then(dbModel => {
        res.json(dbModel)
        
      })
      .catch(err => res.status(422).json(err));
  },
  // create: function(req, res) {
  //   console.log("create house");
  //   db.House
  //     .create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  create: function(req, res) {
    console.log("create new house but check for existing before");
    const houseData = {
      street: req.body.street,
      city: req.body.city,
      st: req.body.st,
      zip: req.body.zip,
      lat: req.body.lat,
      long: req.body.long,
      date: new Date(Date.now())
    }
    console.log(req.body);
    console.log(houseData);
    db.House.findOne({
      long: houseData.long, lat: houseData.lat 
    }).then(House => {
      if (House) {
        res.json({
          error: 'This property/house already exists'
        })
      } else {
        db.House
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
        }})
        .catch(err => {
          res.send('error: ' + err)
        })
   },
  update: function(req, res) {
    db.House
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },
  //Route to save a house to the saved houses database
  savehouse: function(req,res) {
    
    db.SavedHouses.create(req.body)
      .then(function(dbSavedHouse) {
        console.log('this is the saved house', dbSavedHouse )
        return db.User.findOneAndUpdate(
          {username: req.params.id},
          { $push: {savedHouses:dbSavedHouse._id}},
          {new:true}
        );
      })
      .then(function(dbUser) {
        console.log('this is the user that got a new saved house', dbUser)
        res.json(dbUser)
      })
      .catch(function(err) {
        res.json(err);
      })
    
  }

};
