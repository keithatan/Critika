const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* Make the schema */
let feedbackSchema = new Schema({
    username: {type: String, required: true},
    anonymous: {type: Boolean, default: false},
    feedbackGood: {type: String, required: true},
    feedbackBad: {type: String, required: true},
    feedbackRecc: {type: String, required: true},
    feedbackRating: {type: Number, default: 0, min: 0, max: 5},
    submissionName: {type: String},
    submissionID: {type: String},
    critiquer: {type:String, required: true}
  });
  
  
  /* Creating the user model from the schema and giving it to Mongoose */
  let feedback = mongoose.model('Feedback', feedbackSchema);

  module.exports = feedback;