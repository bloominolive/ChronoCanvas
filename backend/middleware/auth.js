const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id, 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRATION || '24h' }
    );
};

const verifyToken = (req, res, next) => {
    // Verificar token de sesión primero
    if (req.session && req.session.token) {
        try {
            const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (error) {
            req.session.token = null;
        }
    }

    // Verificar token en headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ 
            message: 'No token provided',
            authRequired: true 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: 'Invalid token', 
            authRequired: true 
        });
    }
};

const isAuthenticated = (req, res, next) => {
    if (req.session && (req.session.user || req.session.token)) {
        return next();
    }
    res.status(401).json({ message: 'Authentication required' });
};

module.exports = { 
    generateToken, 
    verifyToken,
    isAuthenticated 
};