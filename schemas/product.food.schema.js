const mongoose = require('mongoose');

const ProductFoodSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  price: Number,
  storeId: String,
});

module.exports = mongoose.model('productsfood', ProductFoodSchema);
