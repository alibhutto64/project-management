const express = require('express');
const Idea = require('../models/Idea');
const router = express.Router();

// CRUD operations for ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ votes: -1 });
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const idea = new Idea({ title, description });
    await idea.save();
    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Voting endpoints
router.post('/:id/upvote', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    );
    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/downvote', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: -1 } },
      { new: true }
    );
    res.json(idea);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;