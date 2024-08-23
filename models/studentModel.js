const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    availability: [{ start: Date, end: Date }],
    area_of_interest: String,
});

module.exports = mongoose.model('Student', studentSchema);
