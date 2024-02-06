const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const productSchema = require('../schemas/product.schema');
const storeModel = mongoose.model('product', productSchema);

class ProductService {
  async findAllProduct() {
    return 'hola mundo desde el servicio de producto';
  }
}

module.exports = ProductService;
