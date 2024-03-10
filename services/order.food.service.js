const OrderFood = require('../schemas/order.food.schema');
const { keyGenerate } = require('../utils/helpers.js');

class OderFoodService {
  async findByUser(userId) {
    const orders = await OrderFood.find({ user: userId })
      .populate('store')
      .exec();

    return orders;
  }

  async findByStore(storeId, date = new Date()) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const orders = await OrderFood.find({
      store: storeId,
      createdAt: { $gte: start, $lt: end },
    })
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
