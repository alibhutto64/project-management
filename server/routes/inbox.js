const express = require('express');
const InboxItem = require('../models/InboxItem');
const router = express.Router();

// Get all inbox items
router.get('/', async (req, res) => {
  try {
    const items = await InboxItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new inbox item
router.post('/', async (req, res) => {
  try {
    const { source, content, dueDate, subTasks } = req.body;
    const item = new InboxItem({ source, content, dueDate, subTasks });
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;