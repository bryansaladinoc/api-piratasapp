const mongoose = require('mongoose');

const OrderFoodSchema = new mongoose.Schema(
  {
    deliveryTime: Number,
    description: String,
    image: String,
    name: String,
    paymentMethod: { type: String, required: true },
    products: [
      {
        __v: Number,
        _id: String,
        description: String,
        image: String,
        price: Number,
        quantity: Number,
        comment: String,
        storeId: String,
        title: String,
      },
    ],
    qualify: String,
    row: { type: String, required: true },
    seat: { type: Number, required: true },
    section: { type: Number, required: true },
    storeId: { type: String, required: true },
    status: { type: String, required: true },
    totalPayment: { type: Number, required: true },
    userId: { type: String, required: true },
    securityCode: { type: String, required: true },
    payment: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ordersfood', OrderFoodSchema);
