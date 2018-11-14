const mongoose = require('mongoose');
let Schema = mongoose.Schema;

/* Make the schema */
let categorySchema = new Schema({
    categoryName: {type: String, required: true},
    categoryDescription: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now},
    founder: {type: String},
    numberOfSubscribers: {type: Number, default: 1},
    moderators: {type: [String]},
    /* Need to store all the submissions for this category, Array? of what? */
  });
  
  
  /* Creating the user model from the schema and giving it to Mongoose */
  let category = mongoose.model('category', categorySchema);

  
  
  module.exports = category;