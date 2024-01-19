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

module.exports = mongoose.model('players', playerSchema);
