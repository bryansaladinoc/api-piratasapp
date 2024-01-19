const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  nickname: String,
  email: String,
  password: String,
  phone: String,
  country: String,
  state: String,
  city: String,
  sex: String,
});

const exampleSchema = mongoose.Schema({
  name: String,
  comments: [
    {
      contenct: String,
      user: {
        name: String,
        nickname: String,
      },
    },
  ],
});

module.exports = mongoose.model('user', userSchema);
