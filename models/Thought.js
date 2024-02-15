const { Schema, model } = require('mongoose');
const User = require('./User');
const reactionSchema = require('./Reaction');


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
    get: (timestamp) => dateFormat(timestamp),
  },

  username: {
    type: String,
    required: true,
  },

  reactions: [reactionSchema],
},
{
    toJSON:{
    virtuals: true,
    },
    id: false,
}
);


// virtual for reactions
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;