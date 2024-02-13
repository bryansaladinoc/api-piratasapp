const StoreFood = require('../schemas/store.food.schema');

class StoreFoodService {
  async find() {
    const stores = await StoreFood.find().exec();

    return stores;
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
