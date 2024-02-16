const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const orderSchema = require('../schemas/order.schema');
const model = mongoose.model('order', orderSchema);

class OrderService {
  async newOrder(data) {
    const result = await new model({ ...data });
    await result.save();
    return await result;
  }

  async findAll() {
    const result = await model.find();
    return await result;
  }

  async findUser(idUser) {
    const result = await model.find({ "user.idUser": idUser }, {
      ' _id': 1,
      'createdAt': 1,
      'total': 1,
      'status': 1,
      'store.name': 1,
      'deliveryDate': 1,
      'deliveryKey': 1,
    });
    return await result;
  }
  
  async find(idOrder) {
    const result = await model.findOne({ "_id": idOrder });
    return await result;
  }

  async updateStatus(data) {
    const idOrder = data.idOrder;
    const status = data.status;

    const result = await model.updateOne(
      { "_id": idOrder },
      { $set: { "status": status } }
    );

    return await result;
  }

}

module.exports = OrderService;
