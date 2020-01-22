const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userImage: { type: String, default: 'https://cdn.images.express.co.uk/img/dynamic/79/590x/secondary/Emilia-Clarke-Game-Of-Thrones-Instagram-pictures-new-dog-puppy-2270102.jpg?r=1579617194786', required: true},
  date: { type: Date, default: Date.now },
  commentRef: {
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
