const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  name: String,
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'permissions' }],
});

module.exports = mongoose.model('roles', roleSchema);
