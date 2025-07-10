const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  room:       { type: String, required: true, index: true },
  senderId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderName: { type: String, required: true },
  text:       { type: String },
  fileUrl:    { type: String },
  timestamp:  { type: Date, default: Date.now, index: true },
  reactions:  { type: Map, of: [String], default: {} },
  readBy:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
module.exports = mongoose.model('Message', MessageSchema);