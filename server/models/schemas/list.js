const { Schema } = require('mongoose');

const sectionSchema = require('./section');

const listSchema = Schema({
  title: {
    type: String,
    require: true,
    default: '',
  },
  color: {
    type: String,
    require: true,
    default: 'default', // #F3F4F6
  },
  sections: {
    type: [sectionSchema],
    require: true,
    default: [],
  },
}, { timestamps: true });

module.exports = listSchema;
