require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const inboxRoutes = require('./routes/inbox');
const ideaRoutes = require('./routes/ideas');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const { MongoMemoryServer } = require('mongodb-memory-server');

async function connectDB() {
  if (process.env.NODE_ENV === 'development') {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected to in-memory server');
  } else {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected to production server');
  }
}

connectDB().catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/inbox', inboxRoutes);
app.use('/api/ideas', ideaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));