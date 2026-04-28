const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const axios = require('axios');

const router = express.Router();

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId })
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create transaction
router.post('/', auth, async (req, res) => {
  try {
    const { amount, merchant, description, location } = req.body;

    // Call ML model for fraud detection
    let fraudScore = 0;
    try {
      const mlResponse = await axios.post('http://localhost:5001/predict', {
        amount,
        merchant,
        location
      });
      fraudScore = mlResponse.data.fraud_score;
    } catch (error) {
      console.log('ML model not available, using default score');
      fraudScore = Math.random() * 100;
    }

    const transaction = new Transaction({
      userId: req.user.userId,
      amount,
      merchant,
      description,
      location,
      fraudScore,
      isFraud: fraudScore > 50,
      status: fraudScore > 70 ? 'flagged' : fraudScore > 50 ? 'pending' : 'approved'
    });

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update transaction status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
