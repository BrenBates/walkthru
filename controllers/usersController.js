const db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Defining methods for the usersController
module.exports = {
  findAll: function(req, res) {
    console.log('made it here')
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  register: function(req,res) {
    console.log('Leeeeerrrroooooooy')
    
  }

};
