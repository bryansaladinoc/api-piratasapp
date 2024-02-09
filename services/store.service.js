const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const storeSchema = require('../schemas/store.schema');
const model = mongoose.model('store', storeSchema);

class StoreService {
  async findAllStore() {
    const result = await model.find({}).exec();
    return await result;
  }

  async newStore(data) {
    const result = await new model({ ...data });
    await result.save();
    return await result;
  }

  async findByName(name) {
    const result = await model.find({"name": name}).exec();
    return await result;
  }

  async newEmployee(data) {
    const result = await model.updateMany({ "_id": data.idStore }, { $push: { "employees": data.employees } });
    return await result;
  }

  findEmployee(idStore, phone) {
    const result = model.findOne({ "_id": idStore, "employees.phone": phone }).exec();

    /* const result = model.findOne( // Buscar un empelado que coincida con la condición
      { "_id": idStore, "employees.phone": phone },
      { "employees.$": 1 } // Proyección para seleccionar solo el primer elemento que coincida, se pueden agregar más campos
    ).exec(); */

    return result;
  }

  async deleteEmployee(idStore, phone) {
    const result = await model.updateOne({ "_id": idStore }, { $pull: { "employees": { "phone": phone } } });
    return await result;
  }

}

module.exports = StoreService;
