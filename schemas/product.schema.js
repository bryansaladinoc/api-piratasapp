const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: { type: String, unique: true },
    description: String,
    image: [{
      uri: String,
    }],
    category: String,
    sku: { type: String, unique: true },
    store: [
      {
        name: String,
        location: String,
        latitud: String,
        longitud: String,
        infoProduct: [
          {
            specification: [{
              price: Number,
              color: String,
              size: String,
              stock: Number,
            }],
            userRegister: {
              idUser: String,
              name: String,
              lastname: String,
              motherlastname: String,
              phone: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

module.exports = productSchema;
