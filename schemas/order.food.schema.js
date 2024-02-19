const mongoose = require('mongoose');

const OrderFoodSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('ordersfood', OrderFoodSchema);
