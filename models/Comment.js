const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Body is the comment itself, and we have 2 references - one to the user and one to the house the comment is attached to
const CommentSchema = new Schema({
  body: {
    type: String, required: true
  },
  userRef: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  houseRef: {
    type: Schema.Types.ObjectId,
    ref: 'House'
  }
});

// This creates our model from the above schema, using mongoose's model method
const Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
