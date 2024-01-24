const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  nickname: String,
  email: { type: String, unique: true },
  password: String,
  phone: { type: String, unique: true },
  country: String,
  state: String,
  city: String,
  sex: String
});

userSchema.add({
  image: String
});


module.exports = mongoose.model('user', userSchema);
