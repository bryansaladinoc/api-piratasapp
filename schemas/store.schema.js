const mongoose = require('mongoose');

const storeSchema = mongoose.Schema(
  {
    name: String,
    location: String,
    latitud: String,
    longitud: String,
  },
  { timestamps: true },
);

module.exports = storeSchema;
