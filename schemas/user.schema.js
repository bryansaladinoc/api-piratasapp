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

module.exports = userSchema;
