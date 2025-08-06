const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// controllers/authController.js

exports.signup = async (req, res) => {
  try {
    console.log("✅ Received signup request with body:", req.body);

    const { name, civilId, mobile, fileNo, password } = req.body;

    // Optional: Add validations logs
    if (!name || !civilId || !mobile || !fileNo || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Add DB insertion logic here
    const newUser = await User.create({
      name,
      civilId,
      mobile,
      fileNo,
      password: hashedPassword,
    });

    console.log("✅ New user created:", newUser);

    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("❌ Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { mobileOrFile, password } = req.body;

  try {
    console.log('➡️ Incoming login request:', req.body);

    const user = await User.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { mobile: mobileOrFile },
          { fileNo: mobileOrFile }
        ]
      }
    });
    console.log('👤 User found:', user);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};