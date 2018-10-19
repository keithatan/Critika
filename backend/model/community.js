const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* Make the schema */
let communitySchema = new Schema({
    communityName: {type: String, required: true},
    communityDescription: {type: String},
    communityID: {type: String},
    dateCreated: {type: Date, default: Date.now},
    numberOfSubscribers: {type: Number, default: 0},
    admins: {type: [String]},

    /* Need to store all the submissions for this community, Array? of what? */
  });
  
  
  /* Creating the user model from the schema and giving it to Mongoose */
  let community = mongoose.model('community', communitySchema);
  
  module.exports = community;