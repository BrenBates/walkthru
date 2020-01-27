const db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Defining methods for the usersController
module.exports = {
  findAll: function (req, res) {
    db.User
      .find(req.query)
      .sort({
        date: -1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //Method for a new user to register to the app.
  register: function (req, res) {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      date: new Date(Date.now())
    }
    //find if the username is already taken
    db.User.findOne({
      username: userData.username
    }).then(Username => {
      if (Username) {
        res.json({
          error: 'User name is unavailable'
        })
      } else {
        //find if the email is already taken, if not create user
        db.User.findOne({
          email: userData.email
        }).then(User => {
          if (!User) {
            const hash = bcrypt.hashSync(userData.password, 10)
            userData.password = hash

            db.User.create(userData)
              .then(User => {
                let userData = {
                  username: User.username,
                  email: User.email,
                  password: User.password
                }
                let token = jwt.sign(userData, process.env.REACT_APP_SECRET_KEY, {
                  expiresIn: 10000
                })
                res.json({
                  token: token,
                  username: User.username,
                  email: User.email,
                  userImage: User.userImage
                })
              }).catch(err => {
                res.send('error: ' + err)
              })
          } else {
            res.json({
              error: 'A user with that email already exists'
            })
          }
        }).catch(err => {
          res.send('error: ' + err)
        })
      }
    })
  },
  //Method for an existing user to sign in to the app.
  logIn: function (req, res) {
    let email = req.body.email.trim();
    db.User.findOne({
      email: email
    })
      .then(
        User => {
          if (!User) {
            res.json({
              error: 'There is no user with that email address'
            })
          } else {
            if (bcrypt.compareSync(req.body.password, User.password)) {
              let userData = {
                email: User.email,
                password: User.password
              }
              let token = jwt.sign(userData, process.env.REACT_APP_SECRET_KEY, {
                expiresIn: 60000
              })
              res.json({
                token: token,
                username: User.username,
                email: User.email,
                userImage: User.userImage
              })
            } else {
              res.json({
                error: 'Password incorrect'
              })
            }
          }
        })
      .catch(err => {
        res.send('error: ' + err)
      })
  },

  //Method for updating a users profile picture
  updateProfilePic: function(req,res) {
    console.log('updating profile picture')
    console.log(req.body.imgURL)

    db.User.findOneAndUpdate(
      {"username": req.body.user},
      {"userImage": req.body.imgURL}
      ).then(dbModel => {
        console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));


  },
  //Method for validating a user token to allow access to a private route.
  validateToken: function (req, res) {
    console.log('Meow')
  }

};