// src/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

router.post('/register', async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { username: req.body.username } 
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password before creating user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create user with hashed password
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword
    });

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    
    console.log('User registered successfully:', user.username);
    res.json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    // Validate input
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find user
    const user = await User.findOne({ 
      where: { username: req.body.username } 
    });

    if (!user) {
      console.log('Login attempt failed: User not found -', req.body.username);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      console.log('Login attempt failed: Invalid password -', req.body.username);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    
    console.log('User logged in successfully:', user.username);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;