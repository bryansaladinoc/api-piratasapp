const mongoose = require('mongoose');

const ProductFoodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  storeId: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('productsfood', ProductFoodSchema);
