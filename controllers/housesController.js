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

  }
//   remove: function(req, res) {
//     db.House
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
};
