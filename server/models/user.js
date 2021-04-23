const { Schema } = require('mongoose');

const mongoose = require('./index');

const listSchema = require('./schemas/list');

const userSchema = Schema({
  firstName: {
    type: String,
    required: true,
    default: '',
  },
  lastName: {
    type: String,
    required: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
    default: '',
  },
  password: {
    type: String,
    required: true,
    default: '',
  },
  lists: {
    type: [listSchema],
    required: true,
    default: [],
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
