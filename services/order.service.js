const mongoose = require('mongoose');
const schedule = require('node-schedule');
const boom = require('@hapi/boom');
const orderSchema = require('../schemas/order.schema');
const productSchema = require('../schemas/product.schema');
const { encrypt, decrypt } = require('../utils/crypt/index');

const model = mongoose.model('order', orderSchema);
const userModel = require('../schemas/user.schema');
const productModel = mongoose.model('product', productSchema);

class OrderService {
  async newOrder(data, idUser) {
    data.status = 'Pendiente';
    data.statusNote = 'Pendiente de confirmación';

    const session = await model.startSession();
    await session.startTransaction();
    try {
      const idStore = data.store.idStore;
      const deliveryKeyEncrypted = encrypt(data.deliveryKey);
      data.deliveryKey = JSON.stringify(deliveryKeyEncrypted);
      data.userEdit = idUser;
      data.userOrder.user = idUser;
      data.store = idStore;

      const order = await new model({ ...data });
      await order.save();
      console.log('Orden creada:', order._id);

      for (const product of data.products) {
        const idProduct = product.idProduct;
        const amount = product.amount;
        //BUSCAR STOCK
        const findStock = await productModel.findOne(
          { '_id': idProduct, 'stores.store': idStore },
          { 'stores.$': 1 }
        );

        console.log(findStock);
        //SI NO HAY STOCK
        if (findStock.stores[0].stock < amount) {
          throw new Error('No hay suficiente stock');

        } else {
          await productModel.updateOne(
            { '_id': idProduct, 'stores.store': idStore },
            { $inc: { 'stores.$.stock': -amount } }
          );
        }
      }

      await session.commitTransaction();
      session.endSession();
      return data.products;
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      session.endSession();
      throw boom.badRequest(error);
    }
  }













  async findAll() {
    const result = await model.find({}, {
      ' _id': 1,
      'deliveryDate': 1,
      'status': 1,
      'total': 1,
      'store': 1,
      'user': 1,
      'createdAt': 1,
      'updatedAt': 1,
    }).sort({ createdAt: -1 });
    return await result;
  }

  async findUser(idUser) {
    let result = await model.find({ "userOrder.user": idUser })
  .select({
    '_id': 1,
    'createdAt': 1,
    'total': 1,
    'status': 1,
    'deliveryDate': 1,
    'deliveryKey': 1,
    'store': 1, // Assuming the field that references the store is named 'store'
  })
  .populate('store', ['name']).sort({ createdAt: -1 });

    result = result.map(item => {
      const deliveryKeyObject = JSON.parse(item.deliveryKey);
      item.deliveryKey = decrypt(deliveryKeyObject);
      return item;
    });

    return result;
  }

  async find(idOrder) {
    const result = 
    await model.findOne({ "_id": idOrder }).
    populate('store userOrder.user userEdit.idUser products.idProduct');

    const deliveryKeyObject = JSON.parse(result.deliveryKey);
    result.deliveryKey = decrypt(deliveryKeyObject);
    return await result;
  }

  async updateStatus(data, userLogged) {
    if (data.status === 'Cancelado por cliente') {
      data.statusNote = 'Cancelado por el cliente';

    } else if (data.status === 'Cancelado sin confirmación') {
      data.statusNote = 'El vendedor no confirmó la orden';

    } else if (data.status === 'Cancelado sin entrega') {
      data.statusNote = 'El cliente no recogio el producto';

    } else if (data.status === 'Entregado') {
      data.statusNote = 'Pedido entregado al cliente';

    } else if (data.status === 'En curso') {
      data.statusNote = 'Pedido confirmado';

    }

    const idOrder = data.idOrder;
    const status = data.status;
    const statusNote = data.statusNote;

    const session = await model.startSession();
    await session.startTransaction();
    try {
      const result = await model.updateOne(
        { "_id": idOrder },
        {
          $set: {
            "status": status,
            "statusNote": statusNote,
            "userEdit": userLogged
          }
        }
      );

      await session.commitTransaction();
      session.endSession();
      return result;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw boom.badRequest(error);
    }
  }
}



async function upDateStatusDelivery() {
  try {
    const currentDate = new Date();

    const ordersCancel = await model.find({
      deliveryDate: { $lte: currentDate },
      status: { $ne: 'Cancelado' }, // No actualizar órdenes canceladas
    });

    for (const orden of ordersCancel) {
      console.log('Orden vencida:', orden._id);
      orden.status = 'Cancelado'; // Actualizar el estado según tus necesidades
      await orden.save();
    }

    //console.log('Estados de órdenes vencidas actualizados.');
    console.log(currentDate);
  } catch (error) {
    console.error('Error al actualizar estados de órdenes vencidas:', error);
  }
}

// Programar la tarea para que se ejecute diariamente
schedule.scheduleJob('0 0 * * *', () => {
  upDateStatusDelivery();
});

module.exports = OrderService;
