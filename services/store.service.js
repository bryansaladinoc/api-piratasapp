const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const storeSchema = require('../schemas/store.schema');
const storeModel = mongoose.model('store', storeSchema);

class StoreService {
  async findAllStore() {
    return 'hola mundo desde el servicio de store';
  }
}

module.exports = StoreService;
