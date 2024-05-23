const express = require('express');
const router = express.Router();
const Seat = require('../models/Seat');

// Get all seats
router.get('/', async (req, res) => {
    try {
        const seats = await Seat.find();
        res.json(seats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update seat status
router.patch('/:id', async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if (!seat) {
            return res.status(404).json({ message: 'Seat not found' });
        }
        seat.status = req.body.status;
        await seat.save();
        res.json(seat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
