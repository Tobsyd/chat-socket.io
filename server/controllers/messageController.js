const Message = require('../models/messages');


exports.getRoomMessages = async (req, res) => {
  const { room } = req.params;
  const msgs = await Message.find({ room })
    .sort({ timestamp: 1 })
    .limit(100)
    .lean();
  res.json(msgs);
};

exports.handleSend = async (io, socket, { room, message, file }) => {
  const msg = await Message.create({
    room,
    senderId:   socket.user.id,
    senderName: socket.user.username,
    text:       message || null,
    fileUrl:    file || null
  });
  io.to(room).emit('receive_message', msg);
};

