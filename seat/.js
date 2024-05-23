const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/flight-booking', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Booking model
const bookingSchema = new mongoose.Schema({
    from: String,
    to: String,
    depart: Date,
    return: Date,
    class: String,
    adult: Number,
    child: Number,
    flexibleDepart: Boolean,
    flexibleReturn: Boolean
});

const Booking = mongoose.model('Booking', bookingSchema);

// Routes
app.post('/api/book', async (req, res) => {
    const bookingData = req.body;
    try {
        const booking = new Booking(bookingData);
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
