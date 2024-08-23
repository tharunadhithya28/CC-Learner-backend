const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        const token = generateToken(user._id);
        const role = user.role;
        const id = user._id

      
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            maxAge: 30 * 24 * 60 * 60 * 1000, 
        });

        res.cookie('role', role, {
             httpOnly: true, 
             secure: true, 
             maxAge: 30 * 24 * 60 * 60 * 1000, 
            });

            res.cookie('id', id, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000, })
            console.log(role);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};



const loginUser = async (req, res) => {
    console.log("login function");
    
    const { email, password } = req.body;
    console.log(req.body);
    
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        const token = generateToken(user._id);
        const role = user.role 
        const id = user._id

        console.log('User role:', role);

        

        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            maxAge: 30 * 24 * 60 * 60 * 1000, 
        });

        console.log(role);
        

        res.cookie('role', role, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000, })
        console.log(role);

        res.cookie('id', id, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000, })
        console.log(role);
        

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};


const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const logoutUser = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0), 
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


module.exports = { registerUser, loginUser, getUserProfile, logoutUser }
