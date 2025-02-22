const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Optionally, you can generate a token for session management
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "hactivatehackathon", { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
});

// Store Chatbot Message
router.post('/messages', async (req, res) => {
  const { userId, text, sender } = req.body;

  try {
    console.log(userId);
    const response = await axios.post('http://127.0.0.1:5001/chat', {
      user_id: userId,
      message: text,
    });

    console.log(response);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error saving message:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Retrieve Messages for a User
router.get('/messages/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({ user: userId }).populate('user', 'username');
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
