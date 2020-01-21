const db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Defining methods for the usersController
module.exports = {
  findAll: function (req, res) {
    console.log('made it here')
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
    console.log('Leeeeerrrroooooooy')
    console.log(req.body)

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
                console.log(token)
                res.json({
                  token: token
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
    console.log('JEEEEEEEEENKKIIIIIIIIIIIIIIIIIINS')
    console.log(req.body)
    let email = req.body.email.trim();
    console.log('this is the email')
    console.log(email);
    db.User.findOne({
        email: email
      })
      .then(User => {
        console.log(User)
        if (bcrypt.compareSync(req.body.password, User.password)) {
          let userData = {
            email: User.email,
            password: User.password
          }
          let token = jwt.sign(userData, process.env.REACT_APP_SECRET_KEY, {
            expiresIn: 60000
          })
          console.log(token)
          res.json({
            token: token
          })
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  },
  //Method for validating a user token to allow access to a private route.
  validateToken: function (req, res) {
    console.log('Meow')
  }

};