const Booking = require('../models/bookingModel');
const Mentor = require("../models/mentorModel");


const createBooking = async (req, res) => {
    try {
        
        const booking = new Booking(req.body);
        await booking.save();

        await Mentor.findByIdAndUpdate(req.body.mentor, { isBooked: true });
        console.log(req.body.mentor);

        const populatedBooking = await Booking.findById(booking._id)
        .populate('mentor', 'name') 
        

        res.status(201).json(populatedBooking);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBookingsByStudent = async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const bookings = await Booking.find({ student: studentId })
        .populate('mentor', 'name')  
    
      res.status(200).json(bookings);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = { createBooking, getBookingsByStudent };
