const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: String,
    person: String,
    productType: String,
    description: String,
    image: [{
      uri: String,
    }],                
    category: String,
    sku: { type: String, unique: true },
    store: [
      {
        idStore: String,
        name: String,
        location: String,
        latitud: String,
        longitud: String,
        price: Number,
        createAt: Date, //"2024-02-12T15:30:42.320Z"
        info: [
          {
            color: String,
            size: String,
            stock: Number,
            upAt: Date,
            userRegister: {
              idUser: String,
              name: String,
              lastname: String,
              motherlastname: String,
              phone: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true },
);

module.exports = productSchema;
