const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    nickname: { type: String, unique: true },
    name: String,
    lastname: String,
    motherlastname: String,
    email: { type: String, unique: true },
    password: String,
    phonecode: {
      code: String,
      dial_code: String,
      flag: String,
      name: String,
    },
    phone: { type: String, unique: true },
    country: String,
    state: String,
    city: String,
    sex: String,
    age: Number,
    image: String,
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }],
    status: [
      {
        name: String,
        value: Boolean,
        userEdit: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('user', userSchema);
