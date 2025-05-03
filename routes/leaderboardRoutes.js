// routes/leaderboardRoutes.js

const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const router = express.Router();

// Route to get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1, timestamp: 1 });
    return res.json(leaderboard);
  } catch (error) {
    res.status(500).send('Error fetching leaderboard: ' + error);
  }
});

// Route to submit quiz score
router.post('/submit-quiz', async (req, res) => {
  const { name, score } = req.body;

  if (!name || score === undefined) {
    return res.status(400).send('Name and score are required');
  }

  try {
    // Save member score to leaderboard
    const newEntry = new Leaderboard({ name, score });
    await newEntry.save();

    // Get updated leaderboard
    const leaderboard = await Leaderboard.find().sort({ score: -1, timestamp: 1 });
    
    // Send leaderboard data back to client
    return res.json({
      message: 'Score submitted successfully!',
      leaderboard: leaderboard,
      position: leaderboard.findIndex(entry => entry.name === name) + 1 
    });
  } catch (error) {
    res.status(500).send('Error saving score: ' + error);
  }
});

module.exports = router;
