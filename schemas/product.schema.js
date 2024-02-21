const mongoose = require('mongoose');

const productmSchema = mongoose.Schema(
  {
    name: { type: String, unique: true },
    person: String,
    productType: String,
    description: String,
    image: String,
    category: String,
    size: String,
    priceOld: Number,
    priceCurrent: Number,
    exclusive: Boolean,
    status: Boolean,
    sku: { type: String, unique: true },
    userEdit: {
      idUser: String,
      name: String,
      lastname: String,
      motherlastname: String,
      phone: String,
    },
    store: [
      {
        idStore: String,
        name: String,
        location: String,
        latitud: String,
        longitud: String,
        stock: Number,
        createAt: Date, //"2024-02-12T15:30:42.320Z"
        userEdit: {
            idUser: String,
            name: String,
            lastname: String,
            motherlastname: String,
            phone: String,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = productmSchema;
