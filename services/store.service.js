const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const storeSchema = require('../schemas/store.schema');
const model = mongoose.model('store', storeSchema);

class StoreService {
  async findAllStore() {
    const result = await model.find({}).exec();
    return await result;
  }

  async newStore(data, idUser) {
    data.userEdit = idUser;
    const result = await new model({ ...data });
    await result.save();
    return await result;
  }

  async findByName(name) {
    const result = await model.find({"name": name}).exec();
    return await result;
  }

}

module.exports = StoreService;
