const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const productSchema = require('../schemas/product.schema');
const model = mongoose.model('product', productSchema);

class ProductService {
  async new(data, idUser) {
    data.userEdit = idUser;
    data.priceOld = data.priceCurrent;
    const result = await new model({ ...data });
    await result.save();
    return await result;
  }

  async findAllActive() {
    const result = await model.aggregate([
      {
        $unwind: '$stores', // Deshace el array 'stores' para tratar cada tienda por separado
      },
      {
        $group: {
          _id: '$_id', // Agrupa por el ID del producto
          totalStock: { $sum: '$stores.stock' }, // Suma el stock de todas las especificaciones
          name: { $first: '$name' }, // GREGA MAS CAMPOS A LA CONSULTA
          description: { $first: '$description' },
          price: { $first: '$priceCurrent' },
          priceOld: { $first: '$priceOld' },
          typeProduct: { $first: '$typeProduct' },
          image: { $first: '$image' },
          size: { $first: '$size' },
          exclusive: { $first: '$exclusive' },
          status: { $first: '$status' },
          category: { $first: '$category' },
          sku: { $first: '$sku' },
        },
      },
      {
        $match: {
          totalStock: { $ne: 0 }, // Excluye productos con suma de stock igual a 0
          status: { $ne: false },
        },
      },
    ]);
    console.log(result.length);
    return await result;
  }

  async findActive(idProd) {
    S;
    const result = await model.aggregate([
      {
        "$match": { "_id": new mongoose.Types.ObjectId(idProd) } // Busca por el ID del producto
      },
      {
        $unwind: '$stores',
      },
      {
        "$match": {
          "totalStock": { "$ne": 0 }, // Excluye productos con suma de stock igual a 0
          "status": { "$ne": false },
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'stores.userEdit',
          foreignField: '_id',
          as: 'userEditStore',
        },
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'stores.store',
          foreignField: '_id',
          as: 'storeInfo',
        },
      },
      {
        $group: {
          _id: '$_id',
          totalStock: { $sum: '$stores.stock' },
          name: { $first: '$name' },
          typeProduct: { $first: '$typeProduct' },
          description: { $first: '$description' },
          image: { $first: '$image' },
          category: { $first: '$category' },
          size: { $first: '$size' },
          priceOld: { $first: '$priceOld' },
          priceCurrent: { $first: '$priceCurrent' },
          exclusive: { $first: '$exclusive' },
          sku: { $first: '$sku' },
          userEdit: { $first: '$userEdit' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          status: { $first: '$status' },
          userEditData: { $first: '$userEdit' },
          stores: { $addToSet: '$stores._id' },
          storesData: {
            $addToSet: {
              _id: '$stores.store',
              name: { $arrayElemAt: ['$storeInfo.name', 0] },
              location: { $arrayElemAt: ['$storeInfo.location', 0] },
              latitud: { $arrayElemAt: ['$storeInfo.latitud', 0] },
              longitud: { $arrayElemAt: ['$storeInfo.longitud', 0] },
              stock: '$stores.stock',
              createAt: '$stores.createAt',
              status: '$stores.status',
              userEditStore: {
                _id: { $arrayElemAt: ['$userEditStore._id', 0] },
                nickname: { $arrayElemAt: ['$userEditStore.nickname', 0] },
                email: { $arrayElemAt: ['$userEditStore.email', 0] },
                phone: { $arrayElemAt: ['$userEditStore.phone', 0] },
                name: { $arrayElemAt: ['$userEditStore.name', 0] },
                lastname: { $arrayElemAt: ['$userEditStore.lastname', 0] },
                motherlastname: {
                  $arrayElemAt: ['$userEditStore.motherlastname', 0],
                },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userEdit',
          foreignField: '_id',
          as: 'userEditData',
        },
      },
      {
        $project: {
          _id: 1,
          totalStock: 1,
          name: 1,
          typeProduct: 1,
          description: 1,
          image: 1,
          category: 1,
          size: 1,
          priceOld: 1,
          priceCurrent: 1,
          exclusive: 1,
          sku: 1,
          createdAt: 1,
          updatedAt: 1,
          status: 1,
          userEditData: {
            _id: 1,
            nickname: 1,
            email: 1,
            phone: 1,
            name: 1,
            lastname: 1,
            motherlastname: 1,
          },
          storesData: 1,
        },
      },
    ]);

    return result;
  }

  async findInStore(idProduct, nameStore) {
    // BUSCA UN PRODUCTO EN UNA TIENDA
    const result = await model.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(idProduct),
        },
      },
      {
        $unwind: '$stores',
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'stores.store',
          foreignField: '_id',
          as: 'storeInfo',
        },
      },
      {
        $match: {
          'storeInfo.name': nameStore,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'stores.userEdit',
          foreignField: '_id',
          as: 'userEditStore',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userEdit',
          foreignField: '_id',
          as: 'userEditData',
        },
      },
      {
        $project: {
          _id: 1,
          stores: {
            stock: 1,
            createdAt: 1,
          },
          userEditData: {
            name: { $arrayElemAt: ['$userEditData.name', 0] },
          },
          storeInfo: {
            _id: { $arrayElemAt: ['$storeInfo._id', 0] },
            name: { $arrayElemAt: ['$storeInfo.name', 0] },
            location: { $arrayElemAt: ['$storeInfo.location', 0] },
            latitud: { $arrayElemAt: ['$storeInfo.latitud', 0] },
            longitud: { $arrayElemAt: ['$storeInfo.longitud', 0] },
            userEditStore: {
              name: { $arrayElemAt: ['$userEditStore.name', 0] },
            },
          },
          // Agrega más campos según sea necesario
        },
      },
    ]);

    return result;
  }

  //OPCIONES DE ADMINISTRADOR
  async newStore(data, idUser) {
    // REGISTRAR  NUEVO PRODUCTO EN UNA TIENDA
    const store = {
      store: data.idStore,
      stock: data.stock,
      createAt: new Date(),
      status: true,
      userEdit: idUser,
    };

    const result = await model.updateOne(
      { _id: data.idProduct },
      { $push: { stores: store } },
    );

    return await result;
  }

  async generalUpdate(data) {
    // ACTUALIZA LA INFORMACIÓN GENERAL DEL PRODUCTO, SOLO EL ADMIN PUEDE REALIZAR ESTA ACCION
    const result = await model.updateOne(
      { _id: data.idProd },
      {
        $set: {
          name: data.name,
          person: data.person,
          productType: data.productType,
          description: data.description,
          image: data.image,
          category: data.category,
          size: data.size,
          userEdit: data.userEdit,
          priceOld: data.priceOld,
          priceCurrent: data.priceCurrent,
          exclusive: data.exclusive,
          status: data.status,
        },
      },
    );
    return await result;
  }

  async del(idProd) {
    console.log(idProd);
    const result = await model.deleteOne({ _id: idProd }); // ELIMINA EL PRODUCTO
    return await result;
  }

  async delOfStore(idProd, idStore) {
    const result = await model.updateOne(
      { _id: idProd },
      {
        $pull: {
          store: { idStore: idStore },
        },
      },
    );
    return await result;
  }
}

module.exports = ProductService;
