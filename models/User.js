const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  userImage: { type: String },
  date: { type: Date, default: Date.now },
  commentRef: {
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
