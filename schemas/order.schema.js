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
    userOrder: {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      deliveryUser: String,
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
