const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ideaSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  details: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  user: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Idea = mongoose.model('Idea', ideaSchema);
module.exports = {Idea};
