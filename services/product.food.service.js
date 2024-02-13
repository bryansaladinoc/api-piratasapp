const ProductFood = require('../schemas/product.food.schema');

class ProductService {
  async find(storeId = '') {
    const products = await ProductFood.find({
      storeId: {
        $regex: new RegExp(storeId, 'i'),
      },
    }).exec();

    return products;
  }

  async findOne(id) {
    const product = await ProductFood.findOne({ _id: id }).exec();

    return product;
  }

  async create(product) {
    const newProduct = new ProductFood(product);
    const result = await newProduct.save();

    return result;
  }
}

module.exports = ProductService;
