const db = require("../models");

// Defining methods for the commentsController
module.exports = {
  
  create: function(req, res) {
 
    console.log('creating new comment.')

     db.Comment
       .create(req.body)
       .then(dbModel => {
           
           res.json(dbModel)
        })
       .catch(err => res.status(422).json(err));
  },

  findByHouseID: function(req,res) {
      console.log('find comment by house id')
      db.Comment
      .find({
        houseID: req.params.id
      })
      .then(dbModel => {
        res.json(dbModel)
        
      })
      .catch(err => res.status(422).json(err));
  }

};
