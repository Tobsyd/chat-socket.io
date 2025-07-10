const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
exports.sign = payload => jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
exports.verify = token => jwt.verify(token, jwtSecret);