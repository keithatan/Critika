/* Any dependencies needed */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ld = require('lodash');
const vdator = require('validator');
const bcrypt = require('bcrypt');

/* Make the schema */
let userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 6, trim: true },
  password: { type: String, required: true, minlength: 8 },
  verified: Boolean,
  memberSince: {type: Date, default: Date.now},
  rating: {type: mongoose.Schema.Types.Decimal128, default: 0},
  verificationNum: {type: Number, default: 0},
  submissionNum: { type: Number, default: 0},
  ratingNum: { type: Number, default: 0},
  status: {type: String, default: 'reg-user'},
  friends: {type: [String]},
  standing: {type: String, default: 'good'},
  coins: { type: Number, default: 5},
  recoveryUsername: {type: String, unique: true, minlength: 6, trim: true },
  email:{  
    type: String,
    unique: true,
    validate: {
      validator: vdator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  security_question: String,
  security_question_answer: String,
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

/* Search for a user using a token */
userSchema.statics.findByToken = function (token){
  var User = this
  var decodedTokenObj;

  try {
    decodedTokenObj = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decodedTokenObj._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

}

/* Function that runs before an update/creation to user object and hashes password */
userSchema.pre('save', function (next){
  var user = this;

  if (user.isModified('password')){
    bcrypt.genSalt(10, (err,salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  }
  else{
    next();
  }
});

// userSchema.pre('findOneAndUpdate', function() {
//   console.log("middleware")
//   console.log(this)
//   console.log(this.password)
//   bcrypt.genSalt(10, (err,salt) => {
//     bcrypt.hash(this.password, salt, (err, hash) => {
//       this.password = hash;
//     });
//   });
// });

userSchema.statics.findByLogin = function(username, password) {
  var User = this;

  return User.findOne({username}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        }
        else {
          reject();
        }
      });
    });
  });
};

userSchema.statics.findByRecoveryName = function(username, password) {
  var User = this;

  return User.findOne({recoveryUsername: username}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        }
        else {
          reject();
        }
      });
    });
  });
};

userSchema.statics.findByEmail = function(email) {
  var User = this;

  return User.findOne({email}).then((user) => {
    // console.log(user)
    //console.log("email is: " + user.email)
    if (!user.email) {
      return Promise.reject();
    }
    else {
      return Promise.resolve(user);
    }
  });
};

userSchema.statics.findVerificationNumByEmail = function(email) {
  var User = this;

  return User.findOne({email}).then((user) => {
 //   console.log(user.verificationNum)
    if (!user.verificationNum) {
      return Promise.reject();
    }
    else {
      return Promise.resolve(user.verificationNum);
    }
  });
};


/* Function to prevent too much information from being returned on request when the response is the object */
userSchema.methods.toJSON = function () {
  return ld.pick(this.toObject(), ['_id', 'username', 'email'])
};

/* Creating the user model from the schema and giving it to Mongoose */
let User = mongoose.model('User', userSchema);

module.exports = User;