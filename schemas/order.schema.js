const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    deliveryDate: Date,
    status: String,
    statusNote: String,
    confirmationDate: Date,
    userEdit: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    deliveryKey: String,
    total: Number,
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'store' },
    products: [
      {
        idProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        amount: Number,
        price: Number,
        subtotal: Number
      }
    ],
    userOrder: {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
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
