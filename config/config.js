const dotenv = require('dotenv');
dotenv.config();

const config = {
  PORT: process.env.PORT || 4000,
  DB_URI: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
