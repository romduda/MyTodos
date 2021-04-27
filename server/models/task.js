const { Schema } = require('mongoose');

const mongoose = require('./index');

const taskSchema = Schema({
  title: {
    type: String,
    required: true,
    default: '',
  },
  complete: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: '',
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  lists: {
    type: [{ type: Schema.Types.ObjectId, ref: 'List' }],
    require: true,
  },
  // sections: {
  //   type: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  //   require: true,
  // },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
