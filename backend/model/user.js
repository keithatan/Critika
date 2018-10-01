/* Any dependencies needed */
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const vdator = require('validator');

/* Make the schema */
let userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 1, trim: true },
  password: { type: String, required: true, minlength: 6 },
  verified: Boolean,
  email:{  
    type: String,
    validate: {
      validator: vdator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  security_question: String,
  tokens: [{
    access: {
      type: String,
      required: true
      
    },
    token:[{
      type: String,
      require: true
    }]
  }]
});

/* Creating the user model from the schema and giving it to Mongoose */
let User = mongoose.model('User', userSchema);

module.exports = User;