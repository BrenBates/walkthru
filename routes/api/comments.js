const router = require("express").Router();
const commentsController = require("../../controllers/commentsController");


// Matches with "/api/comments/:id"
router
  .route("/:id")
  .post(commentsController.create);


module.exports = router;
