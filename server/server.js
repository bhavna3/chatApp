const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Message Schema
const messageSchema = new mongoose.Schema({
  user: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Load previous messages
  const loadMessages = async () => {
    try {
      const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
      socket.emit('load-messages', messages.reverse());
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  loadMessages();

  // Handle new messages
  socket.on('send-message', async (message) => {
    try {
      const newMessage = new Message({
        user: message.user,
        content: message.content
      });
      await newMessage.save();
      io.emit('new-message', newMessage);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 