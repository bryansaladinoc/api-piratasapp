const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const productSchema = require('../schemas/product.schema');
const model = mongoose.model('product', productSchema);

class ProductService {
  async new(data) {
    const result = await new model({ ...data });
    await result.save();
    return await result;
  }

  async newStore(data) { // REGISTRA UNA NUEVA TIENDA
    const result = await model.updateOne(
      { "_id": data.idProduct },
      { $push: { "store": data.newStore } }
    );
    return await result;
  }

  async find(idProd) {
    //const result = await model.findOne({ "_id": idProd });
    const result = await model.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(idProd), // Convertir el ID a un objeto ObjectId
          'store': {
            $elemMatch: {
              'stock': { $ne: 0 }
            }
          }
        }
      },
      {
        $project: {
          name: 1,
          person: 1,
          productType: 1,
          description: 1,
          image: 1,
          category: 1,
          size: 1,
          priceOld: 1,
          priceCurrent: 1,
          exclusive: 1,
          sku: 1,
          userEdit: 1,
          createdAt: 1,
          updatedAt: 1,
          store: {
            $filter: {
              input: '$store',
              as: 'storeItem',
              cond: { $ne: ['$$storeItem.stock', 0] }
            }
          }
        }
      }
    ]);

    return await result;
  }

  async findLike(name) {
    const result = await model.aggregate([
      {
        "$match": { "name": new RegExp(name, 'i') } // Filtra por coincidenca 'i' mayusculas y minusculas
      },
      {
        "$unwind": '$store' // Deshace el array 'store' para tratar cada tienda por separado
      },
      {
        "$group": {
          "_id": '$_id', // Agrupa por el ID del producto
          "totalStock": {"$sum": '$store.stock' }, // Suma el stock de todas las especificaciones
          "name": { "$first": '$name' }, // GREGA MAS CAMPOS A LA CONSULTA
          "description": { "$first": '$description' },
          "person": { "$first": '$person' },
          "price": { "$first": '$priceCurrent'},
          "priceOld": { "$first": '$priceOld'},
          "productType": { "$first": '$productType' },
          "image": { "$first": '$image' },
          "size": { "$first": '$size' },
          "exclusive": { "$first": '$exclusive' },
          "category": { "$first": '$category' },
          "sku": { "$first": '$sku' },
        }
      }
    ]);
    return await result;
  }

  async findAll() {
    const result = await model.aggregate([
      {
        "$unwind": '$store' // Deshace el array 'store' para tratar cada tienda por separado
      },
      {
        "$group": {
          "_id": '$_id', // Agrupa por el ID del producto
          "totalStock": {"$sum": '$store.stock' }, // Suma el stock de todas las especificaciones
          "name": { "$first": '$name' }, // GREGA MAS CAMPOS A LA CONSULTA
          "description": { "$first": '$description' },
          "person": { "$first": '$person' },
          "price": { "$first": '$priceCurrent'},
          "priceOld": { "$first": '$priceOld'},
          "productType": { "$first": '$productType' },
          "image": { "$first": '$image' },
          "size": { "$first": '$size' },
          "exclusive": { "$first": '$exclusive' },
          "status": { "$first": '$status' },
          "category": { "$first": '$category' },
          "sku": { "$first": '$sku' },
        }
      },
      {
        "$match": {
          "totalStock": { "$ne": 0 }, // Excluye productos con suma de stock igual a 0
          "status": { "$ne": false },
        }
      }
    ]);
    //console.log(result.length)
    return await result;
  }


  async findInStore(idProduct, idStore) {
    const result = await model.findOne( // Buscar un empelado que coincida con la condición
      { "_id": idProduct, "store.name": idStore },
      { "store.$": 1 } // Proyección para seleccionar solo el primer elemento que coincida, se pueden agregar más campos
    ).exec();

    return await result;
  }

  async generalUpdate(data) { // ACTUALIZA LA INFORMACIÓN GENERAL DEL PRODUCTO, SOLO EL ADMIN PUEDE REALIZAR ESTA ACCION
    const result = await model.updateOne(
      { "_id": data.idProd },
      {
        $set: {
          "name": data.name,
          "person": data.person,
          "productType": data.productType,
          "description": data.description,
          "image": data.image,
          "category": data.category,
          "size": data.size,
          "userEdit": data.userEdit,
          "priceOld": data.priceOld,
          "priceCurrent": data.priceCurrent,
          "exclusive": data.exclusive,
          "status": data.status,
        }
      });
    return await result;
  }

  async del(idProd) {
    console.log(idProd)
    const result = await model.deleteOne({ "_id": idProd });  // ELIMINA EL PRODUCTO
    return await result;
  }

  async delOfStore(idProd, idStore) {
    const result = await model.updateOne(
      { "_id": idProd },
    { $pull:
      { "store": { "idStore": idStore }
    }});
    return await result;
  }
}



module.exports = ProductService;
