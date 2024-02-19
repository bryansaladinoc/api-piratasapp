const OrderFood = require('../schemas/order.food.schema');

class OderFoodService {
  async findByUser() {
    const orders = await OrderFood.find({});
  }

  async create(data) {
    const order = new OrderFood({ ...data });

    return await order.save();
  }
}

module.exports = OderFoodService;
