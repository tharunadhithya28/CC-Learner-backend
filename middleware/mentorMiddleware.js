const mentor = (req, res, next) => {
    if (req.user && req.user.role === 'mentor') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Mentor role required' });
    }
};

module.exports = mentor;