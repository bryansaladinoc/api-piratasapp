const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  nombre: String,
  name: String,
  nom: String,
  iso2: String,
  iso3: String,
  phone_code: String,
});

module.exports = mongoose.model('countries', CountrySchema);
