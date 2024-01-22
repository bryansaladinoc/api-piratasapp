const mongoose = require('mongoose');

const newsSchema = mongoose.Schema(
  {
    title: String,
    article: String,
    createBy: String,
    author: String,
    // createdAt: String,
    updatedAt: String,
    imageUri: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('news', newsSchema);
