const db = require("../models");

// Defining methods for the commentsController
module.exports = {
  
  create: function(req, res) {
 
    console.log('made it to the backend.')
    console.log(req)
    
    // db.Comment
    //   .create(req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  }

};
