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
    return await data;
  }

  async newSpecific(data) { // REGISTRA UNA NUEVA ESPECIFICACION DE UN PRODUCTO
    const result = await model.updateOne(
      { "_id": data.idProduct, 'store.name': data.idStore },
      { $push: { "store.$.info": data.newSpecific } }
    );
    return await result;
  }

  async find(idProd) {
    const result = await model.findOne({ "_id": idProd });
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
        "$unwind": '$store.info' // Deshace el array 'infoProduct' para tratar cada información de producto por separado
      },
      {
        "$group": {
          "_id": '$_id', // Agrupa por el ID del producto
          "totalStock": {"$sum": '$store.info.stock' }, // Suma el stock de todas las especificaciones
          "name": { "$first": '$name' }, // GREGA MAS CAMPOS A LA CONSULTA
          "description": { "$first": '$description' },
          "person": { "$first": '$person' }, 
          "price": { "$first": '$store.price' }, 
          "productType": { "$first": '$productType' },  
          "image": { "$first": '$image' }, 
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
        "$unwind": '$store.info' // Deshace el array 'info' para tratar cada información de producto por separado
      },
      {
        "$group": {
          "_id": '$_id', // Agrupa por el ID del producto
          "totalStock": {"$sum": '$store.info.stock' }, // Suma el stock de todas las especificaciones
          "name": { "$first": '$name' }, // AGREGA MAS CAMPOS A LA CONSULTA
          "description": { "$first": '$description' }, 
          "person": { "$first": '$person' }, 
          "price": { "$first": '$store.price' }, 
          "productType": { "$first": '$productType' }, 
          "image": { "$first": '$image' }, 
          "category": { "$first": '$category' }, 
          "sku": { "$first": '$sku' },
        }
      }
    ]);
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
      { $set: { 
        "name": data.name, 
        "description": data.description, 
        "image": data.image, 
        "category": data.category, 
        "sku": data.sku 
      }}); 
    return await result;
  }

  async upSpecific(data) { // ACTUALIZA LA ESPECIFICAION DE UN PRODUCTO EN UNA TIENDA
    const result = await model.updateOne(
      { "_id": data.idProd, "store.name": data.idStore, "store.info._id": data.idInfo },
      { $set: { 
        "store.$.info.$[i].price": data.price, 
        "store.$.info.$[i].color": data.color, 
        "store.$.info.$[i].size": data.size, 
        "store.$.info.$[i].stock": data.stock, 
        "store.$.info.$[i].upAt": data.upAt,
        "store.$.info.$[i].userRegister": data.userRegister
      }},
      { arrayFilters: [{ "i._id": data.idInfo }]}
    );
    return await result;
  }

  async del(idProd) {
    const result = await model.deleteOne({ "_id": idProd });  // ELIMINA EL PRODUCTO
    return await result;
  }

  async delSpecific(idProduct, idStore, idSpecific){
    const result = await model.updateOne(
      { "_id": idProduct,'store.name': idStore  }, 
    { $pull: 
      { "store.$.info": { "_id": idSpecific } 
    }});
    return await result;
  }

  async delOfStore(idProd, idStore) {
    const result = await model.updateOne(
      { "_id": idProd }, 
    { $pull: 
      { "store": { "name": idStore } 
    }});
    return await result; 
  }

// FLTERS
  async filterBySize(idProd, size) {
    const result = await model.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(idProd) } },
      { $unwind: '$store' },
      {
        $project: {
          'store.idStore': 1,
          'store.name': 1,
          'store.location': 1,
          'store.latitud': 1,
          'store.longitud': 1,
          'store.info': {
            $filter: {
              input: '$store.info',
              as: 'infoItem',
              cond: { $eq: ['$$infoItem.size', size] },
            },
          },
        },
      },
      {
        $match: {
          'store.info': { $ne: [] }, // Elimina documentos donde store.info sea vacío
        },
      },
    ]);
    return await result;
  }

  async filterByStore(idProd, size, idStore) {
    const result = await model.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(idProd) } },
      { $unwind: '$store' },
      { $match: { "store.name": idStore } },
      {
        $project: {
          'store.info': {
            $filter: {
              input: '$store.info',
              as: 'infoItem',
              cond: {
                $and: [
                  { $eq: ['$$infoItem.size', size] },
                ],
              },
            },
          },
        },
      },
    ]);
    return await result;
  }

  async filterByColor(idProd, size, idStore, color) {
    const result = await model.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(idProd) } },
      { $unwind: '$store' },
      { $match: { "store.name": idStore } },
      {
        $project: {
          'store.info': {
            $filter: {
              input: '$store.info',
              as: 'infoItem',
              cond: {
                $and: [
                  { $eq: ['$$infoItem.size', size] },
                  { $eq: ['$$infoItem.color', color] },
                ],
              },
            },
          },
        },
      },
    ]);
    return await result;
  }

}



module.exports = ProductService;
