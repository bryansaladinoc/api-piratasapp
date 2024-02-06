const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    price: Number,
    stock: Number,
    category: String,
    store: [
      {
        name: String,
        location: String,
        latitud: String,
        longitud: String,
        specifications: [
          {
            color: String,
            size: String,
            stock: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

module.exports = productSchema;
