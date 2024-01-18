const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  name: String,
});

module.exports = postSchema;