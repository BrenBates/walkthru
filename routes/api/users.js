const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const user = require("../../models/User");

// Matches with "/api/users"
router.route("/")
  .get(usersController.findAll)
  .put(usersController.updateProfilePic)

// Matches with "/api/users/:username"
router.route("/:username")
  .get(usersController.findOne)


//Matches with /api/users/register
router.route("/register")
    .post(usersController.register);

// router.get("/houses", async (req, res) => {
//   console.log("req.user: ", req.user);
//   //const loggedInUserId = req.user;

//   const houses = await House.find({}).populate("comments");

//   const result = houses.map(house => {
//     return {
//       id: house._id,
//       name: house.name,
//       isCommentedByMe:
//         house.comments.filter(c => c.userRef.toString() === loggedInUserId)
//           .length > 0,
//       commentCount: house.comments.length
//     };
//   });

//   res.send(result);
// });

    //Matches with /api/users/login
router.route("/login")
.post(usersController.logIn);
  
router.route("/validatetoken")
.get(usersController.validateToken);

module.exports = router;


