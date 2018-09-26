/* Any dependencies needed */
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* Make the schema */
let userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: Boolean,
  email:  String,
  security_question: String,
});

/* Creating the user model from the schema and giving it to Mongoose */
let User = mongoose.model('User', userSchema);

module.exports = User;