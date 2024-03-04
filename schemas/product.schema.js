const mongoose = require('mongoose');

const productmSchema = mongoose.Schema(
  {
    name: { type: String, unique: true },
    typeProduct: String,
    description: String,
    image: String,
    category: String,
    size: String,
    priceOld: Number,
    priceCurrent: Number,
    exclusive: Boolean,
    status: Boolean,
    sku: { type: String, unique: true },
    userEdit: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    stores: [
      {
        store: { type: mongoose.Schema.Types.ObjectId, ref: 'store' },
        stock: Number,
        createAt: Date, //"2024-02-12T15:30:42.320Z"
        status: Boolean,
        userEdit: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      },
    ],
  },
  { timestamps: true },
);

module.exports = productmSchema;
