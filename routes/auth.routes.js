// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signup', (req, res, next) => {
  console.log("📥 Incoming POST /signup request");
  next();
}, authController.signup);

router.post('/login', authController.login);

module.exports = router;
