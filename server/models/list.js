const { Schema } = require('mongoose');

const mongoose = require('./index');

const sectionSchema = require('./schemas/section');

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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;
