const mongoose = require('mongoose');

const storeSchema = mongoose.Schema(
  {
    name: String,
    location: String,
    latitud: String,
    longitud: String,
    userEdit: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true },
);

module.exports = storeSchema;
