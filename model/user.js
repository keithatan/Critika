/* Any dependencies needed */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const vdator = require('validator');

/* Make the schema */
let userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 6, trim: true },
  password: { type: String, required: true, minlength: 8 },
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

/* Function to generate the authentication token */
userSchema.methods.generateAuthToken = function (){
  var user = this;
  var access = 'auth';

  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();



  /* Add the token to the user object */
  user.tokens = user.tokens.concat([{access, token}]);

  /* Give the token */ 
  return user.save().then(() =>{
    return token;
  });

};

/* Creating the user model from the schema and giving it to Mongoose */
let User = mongoose.model('User', userSchema);

module.exports = User;