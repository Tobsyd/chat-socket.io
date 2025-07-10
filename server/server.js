const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const auth = require('./socket/auth');
const userController = require('./controllers/userController');
const messageController = require('./controllers/messageController');
const upload = require('./utils/upload');

// Connect MongoDB
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: config.clientUrl, credentials: true } });

// Middleware
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// API Routes
app.post('/api/login', userController.login);
app.get('/api/users', userController.getUsers);
app.get('/api/messages/:room', messageController.getRoomMessages);

//File upload route for file/image sharing

app.post('/api/upload', upload.single('file'), (req, res) => {
  const url = `${config.clientUrl}/uploads/${req.file.filename}`;
  res.json({ url });
});

// Socket.io auth
io.use(auth.verifySocketJWT);
io.on('connection', (socket) => auth.handleConnection(io, socket));

// Start server
server.listen(config.port, () => console.log(`Server running on port ${config.port}`));