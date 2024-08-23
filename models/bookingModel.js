const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
    startTime: {type: Date },
    endTime: {type: Date},
    price: {type: Number},
});

module.exports = mongoose.model('Booking', bookingSchema);
