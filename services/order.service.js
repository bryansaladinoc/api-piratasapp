const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const orderSchema = require('../schemas/order.schema');
const storeModel = mongoose.model('order', orderSchema);

class OrderService {
  async findAllOrder() {
    return 'hola mundo desde el servicio de order';
  }
}

module.exports = OrderService;
