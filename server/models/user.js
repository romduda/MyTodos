const { Schema } = require('mongoose');

const mongoose = require('./index');

const listSchema = require('./schemas/list');

const userSchema = Schema({
  firstName: {
    type: String,
    require: true,
    default: '',
  },
  lastName: {
    type: String,
    require: true,
    default: '',
  },
  email: {
    type: String,
    require: true,
    default: '',
  },
  password: {
    type: String,
    require: true,
    default: '',
  },
  lists: {
    type: [listSchema],
    require: true,
    default: [],
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
