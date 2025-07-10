const User = require('../models/users');
const { sign } = require('../utils/jwt');

exports.login = async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username required' });
  let user = await User.findOne({ username });
  if (!user) user = await User.create({ username });
  const token = sign({ id: user._id, username: user.username });
  res.json({ token, user });
};

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-__v');
  res.json(users);
};