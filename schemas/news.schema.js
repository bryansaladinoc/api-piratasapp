const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
  title: String,
  article: String,
  createBy: String,
  author: String,
  createdAt: String,
  updatedAt: String,
  imageUri: String,
});

module.exports = mongoose.model('news', newsSchema);
