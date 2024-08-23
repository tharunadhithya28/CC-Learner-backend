const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: {type: Date, required : true},
    startTime: {type : String, required : true},
    endTime : {type: String, required : true},
    price: {type: Number, required: true},
    expertise: {type : String},
    isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Mentor', mentorSchema);
