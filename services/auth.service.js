const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const User = require('../schemas/user.schema');

class AuthService {
  async login(phone, password) {
    const user = await User.findOne({
      phone,
      password,
    }).exec();

    if (!user) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user._id,
    };

    return jwt.sign(payload, config.jwtSecret);
  }

  async store(userData) {
    const user = new User({ ...userData });

    await user.save();

    return user;
  }

  // ACTUALIZAR CONTRASEÑA DEL USUARIO
  async updateCurrentPass(idUser, data) {
    const session = await User.startSession();
    await session.startTransaction();
    try {
      const user = await User.findOne({
        "_id": idUser, "password": data.currentPass
      }).exec();

      if (user) {
        await User.updateOne({ "_id": idUser, }, { "password": data.newPass });
        await session.commitTransaction();
        return "Se actualizo la contraseña con exito"
      }

      await session.commitTransaction();
      return false

    } catch (err) {

      await session.abortTransaction();
      console.log(err)
      return false

    } finally {
      await session.endSession();
    }
  }

  // ACTUALIZAR INFORMACION DEL USUARIO
  async updateUser(idUser, data) {
    const session = await User.startSession();
    await session.startTransaction();

    try {
      await User.updateOne({ "_id": idUser }, 
      { 
        "name": data.name,
        "nickname": data.nickname,
        "email": data.email,
        "phone": data.phone,
        "country": data.country,
        "state": data.state,
        "city": data.city,
        "sex": data.sex,
        "image": data.image,
      });

      await session.commitTransaction();
      return "Se actualizo la infomacion con exito"
    } catch (err) {
      await session.abortTransaction();
      console.log(err)
      return "Ocurrio un error"
    } finally {
      await session.endSession();
    }
  }
}

module.exports = AuthService;
