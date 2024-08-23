const express = require('express');
const { createBooking, getBookingsByStudent } = require('../controller/bookingController');
const router = express.Router();



router.get('/student/:studentId', getBookingsByStudent);
router.post("/", createBooking);


module.exports = router;
