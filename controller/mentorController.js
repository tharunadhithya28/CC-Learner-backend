const Mentor = require('../models/mentorModel');


const getMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find();
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        console.log(mentor);
        
        await mentor.save();
        res.status(201).json(mentor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getMentors, createMentor };
