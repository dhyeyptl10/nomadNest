const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Stub routes for now
router.get('/', protect, (req, res) => res.json([]));
router.post('/', protect, (req, res) => res.status(201).json(req.body));

module.exports = router;
