const router = require("express").Router();
const commentsController = require("../../../controllers/commentsController");




// Matches with "/api/comments/byhouse"
router
  .route("/")
  .post(commentsController.create);

// Matches with "/api/comments/byhouse/:id"
router  
    .route("/:id")
    .get(commentsController.findByHouseID);


module.exports = router;
