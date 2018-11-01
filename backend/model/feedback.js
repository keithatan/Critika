const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* Make the schema */
let feedbackSchema = new Schema({
    username: {type: String, required: true},
    anonymous: {type: Boolean, default: false},
    feedbackMessage: {type: String, required: true},
    feedbackSubject: {type: String, required: true},
    feedbackRating: {type: Number, default: 0, min: 0, max: 5},
    submissionID: {type: String},
  });
  
  
  /* Creating the user model from the schema and giving it to Mongoose */
  let feedback = mongoose.model('Feedback', feedbackSchema);

  module.exports = feedback;