const OrderFood = require('../schemas/order.food.schema');
const { keyGenerate } = require('../utils/helpers.js');

class OderFoodService {
  async findByUser(userId) {
    const orders = await OrderFood.find({ userId: userId }).exec();

    return orders;
  }

  async create(data) {
    const securityCode = keyGenerate();
    const order = new OrderFood({ ...data, securityCode });

    return await order.save();
  }
}

module.exports = OderFoodService;
