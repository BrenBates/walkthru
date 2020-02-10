const router = require("express").Router();
const usersController = require("../../controllers/usersController");


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

    //Matches with /api/users/login
router.route("/login")
.post(usersController.logIn);
  
router.route("/validatetoken")
.get(usersController.validateToken);

module.exports = router;


