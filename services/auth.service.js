const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const User = require('../schemas/user.schema');

class AuthService {
  async login(phone, password) {
    const user = await User.findOne({
      phone,
      password,
    }).exec();

    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user._id,
    };

    return jwt.sign(payload, config.jwtSecret);
  }

  async store(userData) {
    const user = new User({ ...userData });

    await user.save();

    return user;
  }
}

module.exports = AuthService;
