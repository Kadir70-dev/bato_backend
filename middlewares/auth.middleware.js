// middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expect: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'inpN3Jkr3woa7zGRciInuetohT81m/kJAvgRhHcY18t0AH01hVMamLb6Mx7W42CbJayvOU9/tqOrHkO74ghqSA=='); 
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ message: 'Invalid token user' });

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};

module.exports = authMiddleware;
