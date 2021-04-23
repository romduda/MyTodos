const { Schema } = require('mongoose');

const mongoose = require('./index');

const taskSchema = Schema({
  title: {
    type: String,
    require: true,
    default: '',
  },
  notes: {
    type: String,
    require: true,
    default: '',
  },
  complete: {
    type: Boolean,
    require: true,
    default: false,
  },
  lists: {
    type: [{ type: Schema.Types.ObjectId, ref: 'List' }],
    require: true,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
