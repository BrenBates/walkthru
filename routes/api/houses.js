const router = require("express").Router();
const housesController = require("../../controllers/housesController");

// Matches with "/api/houses"
router.route("/")
  .get(housesController.findAll)
  .post(housesController.create);

  //Matches with "/api/houses/savehouse/:id"
router.route("/savehouse/:id")
  .post(housesController.savehouse)
  .delete(housesController.deleteSavedHouse)

// Matches with "/api/houses/:id"
router
  .route("/:id")
  .get(housesController.findById);


module.exports = router;