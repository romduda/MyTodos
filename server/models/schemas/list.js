const { Schema } = require('mongoose');

const sectionSchema = require('./section');

const listSchema = Schema({
  title: {
    type: String,
    required: true,
    default: '',
  },
  color: {
    type: String,
    required: true,
    default: 'default', // #F3F4F6
  },
  sections: {
    type: [sectionSchema],
    required: true,
    default: [],
  },
}, { timestamps: true });

module.exports = listSchema;
