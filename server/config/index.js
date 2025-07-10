require('dotenv').config();
module.exports = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI || process.env.MONGO_URI_PRODUCTION,
};