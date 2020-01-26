const router = require("express").Router();
const housesController = require("../../controllers/housesController");


// Matches with "/api/houses"
router.route("/")
  .get(housesController.findAll);

// Matches with "/api/houses/:id"
router
  .route("/:id")
  .get(housesController.findById);

// .put(housesController.update)
//.delete(housesController.remove);

// router.get("/", async (req, res) => {
// const houses = await House.find({}).populate("comments");
// res.send(houses);
// });

module.exports = router;
