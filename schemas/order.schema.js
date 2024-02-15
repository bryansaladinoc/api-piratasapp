const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    deliveryDate: Date,
    status: String,
    deliveryKey: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId,
    },
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
        idProducto: String,
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
    },
  },
  { timestamps: true },
);

module.exports = orderSchema;
