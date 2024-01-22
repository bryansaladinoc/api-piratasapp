const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  name: String,
  surname: String,
  motherLastName: String,
  country: String,
  nationalityCode: String,
  tshirtNumber: Number,
  birthDay: String,
  position: String,
});

playerSchema.add({
  type: String,
  imageUri: String,
});

module.exports = mongoose.model('players', playerSchema);
