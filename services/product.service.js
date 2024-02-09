const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const productSchema = require('../schemas/product.schema');
const model = mongoose.model('product', productSchema);

class ProductService {
  async findProduct() {
    return 'hola mundo desde el servicio de producto';
  }

  async newProduct(data) {
    const result = await new model({ ...data });
    await result.save();
    return await result;
  }

  async findProduct(name) {
    const result = await model.aggregate([
      {
        "$match": { "name": name } // Filtra por el ID del producto
      },
      {
        "$unwind": '$store' // Deshace el array 'store' para tratar cada tienda por separado
      },
      {
        "$unwind": '$store.infoProduct' // Deshace el array 'infoProduct' para tratar cada información de producto por separado
      },
      {
        "$unwind": '$store.infoProduct.specification' // Deshace el array 'specification' para tratar cada especificación por separado
      },
      {
        "$group": {
          "_id": null,
          "totalStock": {"$sum": '$store.infoProduct.specification.stock' }, // Suma el stock de todas las especificaciones
          "name": { "$first": '$name' }, // GREGA MAS CAMPOS A LA CONSULTA
          "description": { "$first": '$description' }, 
          "image": { "$first": '$image' }, 
          "category": { "$first": '$category' }, 
          "sku": { "$first": '$sku' }, 
        }
      }
    ]);

    return await result;
  }

}


module.exports = ProductService;
