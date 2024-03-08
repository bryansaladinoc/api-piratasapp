const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
  name: String,
  color: String,
  price: Number,
  periodicity: Number,
  status: Boolean,
  userEdit: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  includesMember: String,
}, { timestamps: true},
);

module.exports = memberSchema;
