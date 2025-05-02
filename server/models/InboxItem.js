const mongoose = require('mongoose');

const inboxItemSchema = new mongoose.Schema({
  source: { 
    type: String, 
    required: true,
    enum: ['slack', 'email', 'voice'] 
  },
  content: { type: String, required: true },
  dueDate: Date,
  subTasks: [{
    description: String,
    completed: { type: Boolean, default: false }
  }],
  processed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('InboxItem', inboxItemSchema);