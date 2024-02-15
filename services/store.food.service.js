const StoreFood = require('../schemas/store.food.schema');

class StoreFoodService {
  async find() {
    const stores = await StoreFood.find().exec();

    return stores;
  }

  async findOne(id) {
    const store = await StoreFood.findOne({ _id: id }).exec();

    return store;
  }

  async create(storeData) {
    for (let i = 31; i < 101; i++) {
      const store = new StoreFood({
        ...storeData,
        name: `${storeData.name}${i}`,
      });
      await store.save();
    }

    return store;
  }
}

module.exports = StoreFoodService;
