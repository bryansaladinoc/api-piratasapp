const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  name: String,
  user: {
    id: String,
    name: String,
  },
  author: String,
  createBy: String,
  comments: [
    {
      userId: Number,
      nickname: String,
    },
  ],
});

module.exports = mongoose.model('news', articleSchema);
