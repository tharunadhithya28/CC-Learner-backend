const express = require('express');
const { getMentors, createMentor } = require('../controller/mentorController');
const  protect  = require('../middleware/authMiddleware');
const mentor = require("../middleware/mentorMiddleware")
const router = express.Router();


router.get('/', getMentors);
router.post("/", createMentor);



module.exports = router;
