const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    deliveryDate: Date,
    status: String,
    statusNote: String,
    deliveryKey: String,
    total: Number,
    store: {
      idStore: String,
      name: String,
      location: String,
      latitud: String,
      longitud: String,
    },
    products: [
      {
        idProduct: String,
        name: String,
        sku: String,
        description: String,
        amount: Number,
        price: Number,
        subtotal: Number,
        size: String,
        //color: String,
        category: String,
        person: String,
        productType: String,
      },
    ],
    user: {
      idUser: String,
      name: String,
      lastname: String,
      motherLastname: String,
      phone: String,
      phonecode: {
        code: String,
        dial_code: String,
        flag: String,
        name: String,
      },
    },
  },
  { timestamps: true },
);

module.exports = orderSchema;
