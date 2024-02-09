const mongoose = require('mongoose');

const storeSchema = mongoose.Schema(
  {
    name: String,
    location: String,
    latitud: String,
    longitud: String,
    employees: [
      {
        idUser: String,
        name: String,
        lastname: String,
        motherlastname: String,
        phone: { type: String, unique: true }
      }],
  },
  { timestamps: true },
);

module.exports = storeSchema;
