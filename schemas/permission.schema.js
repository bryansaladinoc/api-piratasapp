const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('permissions', permissionSchema);
