
const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll);

//Matches with /api/users/register
router.route("/register")
    .post(usersController.register);

    //Matches with /api/users/register
router.route("/login")
.post(usersController.logIn);
  
router.route("/validatetoken")
.get(usersController.validateToken);

module.exports = router;

// Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// app.get("/api/users", function(req, res) {
//     db.User.find({}).then(function(dbUsers) {
//       res.json(dbUsers);
//     });
//   });


//Register
// router.route('/register').post('/register', (req,res) => {
//     // const today = new Date()
//     const userData = {
//         userName: req.body.userName,
//         password: req.body.password
//         // created: today
//     }
//     console.log('This is the user data:')
//     console.log(userData);

//     //find if the user already exists
//     db.User.findOne({
//         where: {
//             userName: req.body.userName
//         }

//     }).then(User => {
//         if (!User) {
//             const hash = bcrypt.hashSync(userData.password,10)
//             userData.password = hash
//             db.User.create(userData)
//                 .then(User => {
//                     let token = jwt.sign(User.dataValues, process.env.SECRET_KEY, {
//                         expiresIn: 10000
//                     })
                    
//                     console.log(token)
//                     res.json({ token: token })
                    
//                 })
//                 .catch(err => {
//                     res.send('error: ' + err)
//                 })
//         } else {
//             res.json({ error: 'User already exists'})
//         }
//     }).catch(err => {
//         res.send('error: ' + err)
//     })
// })

//LOGIN
// app.post('/login', (req,res) => {
//     db.User.findOne({
//         where: {
//             userName: req.body.userName
//         }
//     })
//         .then(User => {
//             //if client side and database side passwords match, then generate the token and send the token to the front end.  Else, send that the user doesn't exist.
//             if (bcrypt.compareSync(req.body.password, User.password)) {
//                 let token = jwt.sign(User.dataValues, process.env.SECRET_KEY, {
//                     expiresIn: 6000
//                 })
//                console.log(token)
//                 res.json({ token: token })
//             } else {
//                 res.send('User does not exist')
//             }
//         })
//         .catch(err => {
//             res.send('error: ' + err)
//         })
// })


// //PROFILE - fetching profile for the client side.
// app.get('/profile', (req, res) => {
//     var decoded  = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

//     db.User.findOne({
//         where: {
//             id: decoded.id
//         }
//     })
//         .then(User => {
//             if (User) {
//                 res.json(User)
//             } else {
//                 res.send('User does not exist')
//             }
//         })
//         .catch(err => {
//             res.send('error: ' + err)
//         })
// })



