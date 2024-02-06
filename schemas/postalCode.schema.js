const mongoose = require('mongoose');

const PostalCodeSchema = mongoose.Schema({
  codigo_postal: String,
  asentamiento: String,
  tipo_asentamiento: String,
  municipio: String,
  estado: String,
  ciudad: String,
  clave_estado: Number,
  c_oficina: Number,
  tipo_asentamiento_sepomex: Number,
  clave_municipio: Number,
  id_asentamiento: Number,
  zona_asentamiento: String,
  clave_ciudad: Number,
  d_cp: Number,
});

module.exports = mongoose.model('postalCodes', PostalCodeSchema);
