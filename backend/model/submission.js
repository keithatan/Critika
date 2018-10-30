/* Any dependencies needed */
const mongoose = require('mongoose');
let Schema = mongoose.Schema;


let feedbackSchema = new Schema({
  username: {type: String, required: true},
  feedbackMessage: {type: String, required: true},
  feedbackSubject: {type: String, required: true},
  feedbackRating: {type: Number, default: 0, min: 0, max: 5},
});


/* Make the schema */
let submissionsSchema = new Schema({
  category: {type: String, required: true},
  submissionName: {type: String, required: true},
  submissionText: {type: String},
  submissionSkillLevel: {type: String},
  username: {type: String, required: true}, 
  community: {type: String},
  comments:[{
      user: String,
      message: String,
      reported: Boolean,
      reportedMessage: String,
      reportedReason: String,
  }],
  feedback: [{
    feedbackSchema
  }],
  dateSubmitted: {type: Date, default: Date.now},
  //receivedCritiqueIDs: {type: [String], required: true}, 
  numberOfCritiquesRecieved: {type: Number, default: 0}
});


/* Creating the user model from the schema and giving it to Mongoose */
let Submission = mongoose.model('Submission', submissionsSchema);

module.exports = Submission;