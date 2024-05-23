const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
    row: { type: Number, required: true },
    col: { type: Number, required: true },
    status: { type: String, enum: ['available', 'selected', 'occupied', 'exit-row'], default: 'available' }
});

module.exports = mongoose.model('Seat', seatSchema);
