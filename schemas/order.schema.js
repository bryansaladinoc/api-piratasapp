const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    deliveryDate: String,
    status: String,
    deliveryKey: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      default: mongoose.Types.ObjectId,
    },
    total: Number,
    store: {
      name: String,
      location: String,
      latitud: String,
      longitud: String,
    },
    products: [
      {
        name: String,
        description: String,
        amount: Number,
        price: Number,
        subtotal: Number,
        stock: Number,
        size: String,
        color: String,
        category: String,
        image: String,
      },
    ],
    user: {
      name: String,
      lastname: String,
      motherLastname: String,
      phone: String,
      email: String,
    },
  },
  { timestamps: true },
);

module.exports = orderSchema;
