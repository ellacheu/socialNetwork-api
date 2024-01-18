const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
        validator: function(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email address format'
    },
  },

  thoughts: [Thought],

  friends: [User],
});

const User = model('user', userSchema);

module.exports = User;

