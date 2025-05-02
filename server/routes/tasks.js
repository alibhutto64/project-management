const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// AI Task Assistant endpoint
router.post('/assist', async (req, res) => {
  try {
    const { description } = req.body;
    
    // Mock AI processing
    const summary = `Summary of: ${description}`;
    const priority = Math.floor(Math.random() * 10) + 1;
    const nextSteps = [
      'Break down into smaller tasks',
      'Assign to team member',
      'Schedule for review'
    ];

    // Save to database
    const task = new Task({
      description,
      summary,
      priority,
      nextSteps
    });
    await task.save();

    res.json({ summary, priority, nextSteps });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;