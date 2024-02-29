const mongoose = require('mongoose');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('../config/config');
const User = require('../schemas/user.schema');

const postSchema = require('../schemas/post.schema');
const postModel = mongoose.model('posts', postSchema);

class UserService {
  async login(phone, password) {
    const user = await User.findOne({
      phone,
    }).exec();
    const match = await bcrypt.compare(password, user.password);

    if (!user && !match) {
      throw boom.unauthorized();
    }

    const payload = {
      sub: user._id,
    };

    return jwt.sign(payload, config.jwtSecret);
  }

  async store(userData) {
    userData.password = await bcrypt.hash(userData.password, 10);
    // Example Status {
    //   name: 'store',
    //   value: false,
    //   userEdit,
    // }
    // userData.status = [];
    const user = new User({ ...userData });
    await user.save();

    return user;
  }

  async find() {
    return await User.find().populate('roles').exec();
  }

  // Sustituye a selectUser ya tiene el populate
  async getProfile(id) {
    return await User.findOne({ _id: id })
      .populate({
        path: 'roles',
        model: 'roles',
        populate: {
          path: 'permissions',
          model: 'permissions',
        },
      })
      .exec();
  }

  // ACTUALIZAR CONTRASEÑA DEL USUARIO
  async updateCurrentPass(idUser, data) {
    const session = await User.startSession();
    await session.startTransaction();
    try {
      //VALIDA EL USUARIO
      const user = await User.findOne({
        _id: idUser,
      }).exec();

      //COMPARA LA CONTRASEÑA ENCRIPTADA

      const passCompare = await bcrypt.compare(data.currentPass, user.password);
      if (user && passCompare) {
        //ENCRIPTACION DE CONTRASEÑÁ
        const saltRounds = 10;
        const hashPass = await bcrypt.hash(data.newPass, saltRounds);

        await User.updateOne({ _id: idUser }, { password: hashPass }); // CAMBIAR POR hashPass
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
          //phone: data.phone,
          country: data.country,
          state: data.state,
          city: data.city,
          sex: data.sex,
          age: data.age,
          image: data.image,
          rol: data.rol,
          /* status: {
            store: true,
            food: true,
            posts: true,
          } */
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
          //'user.status': false,
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
          //'comments.$[element].userStatus': false,
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

  async upDatePhone(idUser, phone) {
    const session = await User.startSession();
    await session.startTransaction();
    try {
      await User.updateOne(
        { _id: idUser },
        {
          phone: phone,
        },
        { session },
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

  async userValidate(idUser) {
    const user = await User.findOne({ _id: idUser }).exec();
    const data = {
      status: user.status,
      name: user.name,
      rol: user.rol,
    };
    return data;
  }

  async userStatusPosts(idUser, status) {
    const session = await User.startSession();
    await session.startTransaction();
    try {
      await User.updateOne(
        { _id: idUser },
        {
          'status.posts': status,
        },
        { session },
      );

      // ACTUALIZA LA INFORMACION DEL USARIO EN TODOS LOS POST QUE EL HAYA REALIZADO
      const filterPost = { 'user.idUser': idUser };
      const updatePost = await postModel.updateMany(
        filterPost,
        {
          'user.status': status,
        },
        { session },
      );

      // ACTUALIZA TODOS LOS  COMENTARIOS QUE EL USUARIO HAYA REALIZADO EN TODOS LOS POSTS
      const filterComment = { 'comments.idUser': idUser }; // CONDICION PARA EL QUERY
      const actualizacion = {
        $set: {
          'comments.$[element].userStatus': status,
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
