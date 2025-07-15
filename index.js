const express = require('express');
const cors = require('cors');
const User = require('./user.model');
require('./db'); // Connects to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_REGISTRATION_CODE = 'Da31##Zp!8r@WnX2$';

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, registrationCode } = req.body;

    if (registrationCode !== SECRET_REGISTRATION_CODE) {
      return res.status(403).json({ message: 'Invalid registration code' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
