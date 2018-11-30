/* Any dependencies needed */
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var Feedback = require('./feedback.js')

/* Make the schema */
let submissionsSchema = new Schema({
  category: {type: String, required: true, unique: true},
  available: {type: Boolean},
  submissionName: {type: String, required: true},
  submissionText: {type: String},
  submissionDescription: {type: String},
  submissionLink: {type: String},
  submissionSkillLevel: {type: String},
  username: {type: String, required: true}, 

  comments:[{
      user: String,
      message: String,
      reported: Boolean,
      reportedMessage: String,
      reportedReason: String,
  }],
  dateSubmitted: {type: Date, default: Date.now},
  //receivedCritiqueIDs: {type: [String], required: true}, 
  numberOfCritiquesRecieved: {type: Number, default: 0}
});


/* Creating the user model from the schema and giving it to Mongoose */
let Submission = mongoose.model('Submission', submissionsSchema);
module.exports = Submission;