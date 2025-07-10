const { verify } = require('../utils/jwt');
const User = require('../models/users');
const messageController = require('../controllers/messageController');

exports.verifySocketJWT = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const payload = verify(token);
    socket.user = payload;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
};

exports.handleConnection = async (io, socket) => {
  // Update user socketId or //mark online
  await User.findByIdAndUpdate(socket.user.id, { online: true, socketId: socket.id });

  // Broadcast user list
  const users = await User.find().select('-__v');
  io.emit('user_list', users);

  // Join default room
  socket.join('global');

  // Handle events
  socket.on('join_room', ({ room }) => {
    socket.join(room);
    io.to(room).emit('notification', { type: 'join', user: socket.user, room });
  });

  socket.on('select_user', ({ targetUserId}) => {
    const me = socket.user.id;
    const room = me> targetUserId
    ? `${me}_${targetUserId}`
    : `${targetUserId}_${me}`;
    socket.join(room);
    socket.emit('joined_private', { room, with: targetUserId })
  });

  socket.on('send_message', (data) => {
    messageController.handleSend(io, socket, data);
  });

  socket.on('typing', ({ room, isTyping }) => {
    socket.to(room).emit('typing', { user: socket.user, isTyping });
  });

  socket.on('disconnect', async () => {
    // Clear socketId
    await User.findByIdAndUpdate(socket.user.id, { online: false, socketId: null });
    const users = await User.find().select('-__v');
    io.emit('user_list', users);
  });


  socket.on('react_message', async({room, messageId, reaction}) =>{
    const msg = await Message.findById(messageId);
    const users = msg.reactions.get(reaction) || [];
    if(!users.includes(socket.user.id)) users.push(socket.user.id);
    msg.reactions.set(reaction, users);
    await msg.save();
    io.to(room).emit('message_reacted', {messageId, reactions: Array.from(msg.reactions.entries())}); 
  });
};