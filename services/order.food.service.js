const OrderFood = require('../schemas/order.food.schema');
const { keyGenerate } = require('../utils/helpers.js');

class OderFoodService {
  async findByUser(userId) {
    const orders = await OrderFood.find({ user: userId })
      .populate('store')
      .exec();

    return orders;
  }

  async findByStore(storeId) {
    const orders = await OrderFood.find({ store: storeId })
      .populate('store')
      .populate('user', 'name lastname')
      .exec();

    return orders;
  }

  async create(data) {
    const securityCode = keyGenerate(4);
    const order = new OrderFood({ ...data, securityCode });

    await order.save();

    return await OrderFood.populate(order, { path: 'store' });
  }

  async update(id, data) {
    const order = await OrderFood.findOneAndUpdate({ _id: id }, data)
      .populate('store')
      .populate('user')
      .exec();

    return order;
  }
}

module.exports = OderFoodService;
