const mongoose = require('mongoose');
const schedule = require('node-schedule');
const boom = require('@hapi/boom');
const orderSchema = require('../schemas/order.schema');
const productSchema = require('../schemas/product.schema');

const model = mongoose.model('order', orderSchema);
const userModel = require('../schemas/user.schema');
const productModel = mongoose.model('product', productSchema);

class OrderService {
  async newOrder(data) {
    data.status = 'Pendiente';
    data.statusNote = 'Creada por el usuario';
    
    const session = await model.startSession();
    await session.startTransaction();
    try {
      const user = await userModel.findOne({ '_id': data.user.idUser });
      data.userEdit = {
        idUser: user._id,
        name: user.name,
        lastname: user.lastname,
        motherLastname: user.motherlastname,
        phone: user.phone
      };
      
    
      const order = await new model({ ...data });
      await order.save();
      await session.commitTransaction();
      const idStore = data.store.idStore;
      for (const product of data.products) {
        const idProduct = product.idProduct;
        const amount = product.amount;
        //BUSCAR STOCK
        const findStock = await productModel.findOne(
          { '_id': idProduct, 'store.idStore': idStore },
          { 'store.$': 1 }
        );
        
        //SI NO HAY STOCK
        if (findStock.store[0].stock < amount) {
          throw boom.badRequest('No hay suficiente stock');
        } else {
          await productModel.updateOne(
            { '_id': idProduct, 'store.idStore': idStore },
            { $inc: { 'store.$.stock': -amount } }
          );
        }
      }

      session.endSession();
      return order;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw boom.badRequest(error);
    }
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
    }).sort({ createdAt: -1 });
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

async function upDateStatusDelivery() {
  try {
    const currentDate = new Date();

    const ordersCancel = await model.find({
      deliveryDate: { $lte: currentDate },
      status: { $ne: 'Cancelado' }, // No actualizar órdenes canceladas
    });

    for (const orden of ordersCancel) {
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
