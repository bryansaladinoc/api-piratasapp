const mongoose = require('mongoose');

const newsSchema = mongoose.Schema(
  {
    title: String,
    article: String,
    createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    author: String,
    updatedAt: String,
    imageUri: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('news', newsSchema);
