const { Schema } = require('mongoose');

const sectionSchema = Schema({
  title: {
    type: String,
    require: true,
    default: '',
  },
  isDefaultSection: {
    type: Boolean,
    require: true,
    default: false,
  },
  tasks: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    require: true,
    default: [],
  },
}, { timestamps: true });

module.exports = sectionSchema;
