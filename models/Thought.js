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
    get: (timestamp) => dateFormat(timestamp),
  },

  username: {
    type: String,
    required: true,
  },

  reactions: [Reaction],
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
})

thoughtSchema.virtual('formattedTimestamp').get(function() {
    return this.timestamp.toLocaleString();
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;