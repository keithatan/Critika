/* Any dependencies needed */
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* Make the schema */
let submissionsSchema = new Schema({
  category: {type: String, required: true},
  submissionName: {type: String, required: true},
  submissionID: {type: String, required: true, unique: true},
  userID: {type: String, required: true}, 
  dateSubmitted: {type: Date, default: Date.now},
  receivedCritiqueIDs: {type: [String], required: true}, 
  numberOfCritiquesRecieved: {type: Number}
});


/* Creating the user model from the schema and giving it to Mongoose */
let Submission = mongoose.model('Submission', submissionsSchema);

module.exports = Submission;