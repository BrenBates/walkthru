const router = require("express").Router();
const commentsController = require("../../../controllers/commentsController");


// Matches with "/api/comments/byuser"
router
  .route("/")
 

// Matches with "/api/comments/byuser/:id"
router  
    .route("/:id")
  


module.exports = router;
