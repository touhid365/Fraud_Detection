const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

const router = express.Router();

// Get fraud statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });
    
    const stats = {
      total: transactions.length,
      fraudulent: transactions.filter(t => t.isFraud).length,
      flagged: transactions.filter(t => t.status === 'flagged').length,
      approved: transactions.filter(t => t.status === 'approved').length,
      fraudRate: (transactions.filter(t => t.isFraud).length / transactions.length * 100).toFixed(2)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fraud trends
router.get('/trends', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });
    
    const trends = transactions.reduce((acc, t) => {
      const date = t.timestamp.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { total: 0, fraudulent: 0 };
      }
      acc[date].total++;
      if (t.isFraud) acc[date].fraudulent++;
      return acc;
    }, {});

    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
