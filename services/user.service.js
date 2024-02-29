const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const User = require('../schemas/user.schema');

const postSchema = require('../schemas/post.schema');
const postModel = mongoose.model('posts', postSchema);

class UserService {
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

  async find() {
    return await User.find().populate('roles').exec();
  }

  // Sustituye a selectUser ya tiene el populate
  async getProfile(id) {
    return await User.findOne({ _id: id }).populate('roles').exec();
  }

  // ACTUALIZAR CONTRASEÑA DEL USUARIO
  async updateCurrentPass(idUser, data) {
    const session = await User.startSession();
    await session.startTransaction();
    try {
      const user = await User.findOne({
        _id: idUser,
        password: data.currentPass,
      }).exec();

      if (user) {
        await User.updateOne({ _id: idUser }, { password: data.newPass });
        await session.commitTransaction();
        return true;
      }

      await session.commitTransaction();
      return false;
    } catch (err) {
      await session.abortTransaction();
      console.log(err);
      return false;
    } finally {
      await session.endSession();
    }
  }

  async selectUser(idUser) {
    const user = await User.findOne({ _id: idUser }).exec();
    return user;
  }

  // USO DE TRANSACCIONES, RECORDAR CONFIGURAR EL .ENV PARA UTIILIZAR ESTA FUNCIONALIDAD
  // ADEMAS DE REALIZAR LA REPLICA DE DATOS EN MONGO
  // EL SIGUIENTE METODO ACTUALIZA LOS POSTS Y LOS COMENTARIOS DESPUES DE ACTUALIZAR LA INFOMACIÓN DEL USUARIO
  async updateUser(idUser, data) {
    //const validarDatos = validarUsuario();
    /* if(validarDatos){
      throw boom.conflict();
    } */

    const session = await User.startSession();
    await session.startTransaction();

    try {
      //ACTUALIZAR USUARIO
      await User.updateOne(
        { _id: idUser },
        {
          name: data.name,
          lastname: data.lastname,
          motherlastname: data.motherlastname,
          email: data.email,
          phonecode: data.phonecode,
          phone: data.phone,
          country: data.country,
          state: data.state,
          city: data.city,
          sex: data.sex,
          age: data.age,
          image: data.image,
          rol: data.rol,
          status: data.status,
        },
        { session },
      );

      // ACTUALIZA LA INFORMACION DEL USARIO EN TODOS LOS POST QUE EL HAYA REALIZADO
      const filterPost = { 'user.idUser': idUser };
      const updatePost = await postModel.updateMany(
        filterPost,
        {
          'user.name': data.name,
          'user.lastname': data.lastname,
          'user.motherlastname': data.motherlastname,
          'user.imageUserUri': data.image,
          'user.rol': data.rol,
          'user.status': data.status,
        },
        { session },
      );

      // ACTUALIZA TODOS LOS  COMENTARIOS QUE EL USUARIO HAYA REALIZADO EN TODOS LOS POSTS
      const filterComment = { 'comments.idUser': idUser }; // CONDICION PARA EL QUERY
      const actualizacion = {
        $set: {
          'comments.$[element].name': data.name,
          'comments.$[element].lastname': data.lastname,
          'comments.$[element].motherlastname': data.motherlastname,
          'comments.$[element].imageUserUri': data.image,
          'comments.$[element].rol': data.rol,
          'comments.$[element].userStatus': data.status,
        },
      };

      const opciones = {
        session: session,
        arrayFilters: [{ 'element.idUser': idUser }], // CONDICION PARA EL ARREGLO
        multi: true, // IMPORTANTE
      };
      const queryD = await postModel.updateMany(
        filterComment,
        actualizacion,
        opciones,
      );

      await session.commitTransaction();
      return true;
    } catch (err) {
      await session.abortTransaction();
      console.log(err);
      return fasle;
    } finally {
      await session.endSession();
    }
  }
}

module.exports = UserService;