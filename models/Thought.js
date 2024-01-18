const { Schema, Types } = require('mongoose');
const User = require('./User');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },

  createAt: {
    type: Date,
    default: Date.now,
    //getter method to format timestamp on query
  },

  username: {
    type: String,
    required: true,
  },

  reactions: [Reaction],

});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;