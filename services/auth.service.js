const mongoose = require('mongoose');
const userSchema = require('../schemas/user.schema');
const User = mongoose.model('users', userSchema);

class AuthService {
  async store(userData) {
    const user = new User({ ...userData });

    await user.save();

    return user;
  }
}

module.exports = AuthService;
