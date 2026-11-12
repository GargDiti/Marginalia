const jwt = require('jsonwebtoken');
const User = require('../models/user');
module.exports = async function auth(req, res, next) 
{ try
     { const token = 
        (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
         if (!token) return res.status(401).json({ 
            message: 'Sign in to continue' }); 
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = await User.findById(decoded.id); 
        if (!req.user) return res.status(401).json({ 
            message: 'Account not found' }); 
            next(); }
         catch (err) { 
            return res.status(401).json({ 
                message: err.name === 'TokenExpiredError' ? 
                'Your session has expired. Please sign in again.'
                 : 'Invalid session. Please sign in again.'
             });
            }
         };
