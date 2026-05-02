const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Booking created
 */
router.get('/', protect, (req, res) => res.json([]));
router.post('/', protect, (req, res) => res.status(201).json(req.body));

module.exports = router;
