const mongoose = require('mongoose');
const postSchema = require('../schemas/post.schema');
const boom = require('@hapi/boom');
const postModel = mongoose.model('posts', postSchema);



class PostService {
  async findAllPost() {
    const result = await postModel.find({ "user.status": 1 }).exec();
    return await result;
  }

  async findPost(idPost) {
    const result = await postModel.find({ "_id": idPost, "user.status": 1 }).exec();
    /*  const comentarios = querySelectOne.comments; // Obtiene el arreglo de objetos de comentarios por publicacion
     console.log(Object.keys(comentarios).length); // Obtiene el numero total de comentarios*/
    return await result;
  }

  async createPost(dataPost) {
    const result = await new postModel(
      { ...dataPost });
    await result.save();
    return result;
  }

  async deletePost(idPost) {
    const result = await postModel.deleteOne({ "_id": idPost });
    return result;
  }

  async findPostByUser(userId) {
    const result = await postModel.find({ "user.idUser": userId }).exec();
    return await result;
  }

  async likePostByUser(dataPost) {
    const result = await postModel.updateMany({ "_id": dataPost.idPost }, { $push: { 'likes': dataPost.likes } });
    return await result;
  }

  async deleteLikePostByUser(idpost, iduser) {
    const result = await postModel.updateMany({ "_id": idpost }, { $pull: { "likes": { "idUser": iduser } } });
    return await result;
  }

  //LOS COMENTARIOS POR USUARIO EN EL POST SE OBTENDRAN DESDE EL FRONT CON EL METODO findPost O PUEDE SER findPostByUser
  async commentsByPost(dataPost) {   //ESTE METODO REGISTRA NUEVOS COMENTARIOS
    const result = await postModel.updateMany({ "_id": dataPost.idPost }, { $push: { 'comments': dataPost.comments } });
    return await result;
  }

  async deleteCommentByUSer(idpost, idcomment) {
    const result = await postModel.updateMany({ "_id": idpost }, { $pull: { "comments": { "_id": idcomment } } });
    return await result;
  }


  // USO DE TRANSACCIONES, RECORDAR CONFIGURAR EL .ENV PARA UTIILIZAR ESTA FUNCIONALIDAD
  // ADEMAS DE REALIZAR LA REPLICA DE DATOS EN MONGO
  // EL SIGUIENTE METODO ACTUALIZA LOS POSTS Y LOS COMENTARIOS DESPUES DE ACTUALIZAR LA INFOMACIÓN DEL USUARIO
  async updateCollection(idUser, dataPost) {
    const session = await postModel.startSession()
    await session.startTransaction();

    try {
      //ACTUALIZAR USUARIO



      // ACTUALIZA LA INFORMACION DEL USARIO EN TODOS LOS POST QUE EL HAYA REALIZADO
      const filterPost = { "user.idUser": idUser }; 
      const actualizarPosts = await postModel.updateMany(filterPost,
        {
          "user.nickname": dataPost.user.nickname,
          "user.name": dataPost.user.name,
          "user.imageUserUri": dataPost.user.imageUserUri,
          "user.status": dataPost.user.status,
        }, { session });

      // ACTUALIZA TODOS LOS  COMENTARIOS QUE EL USUARIO HAYA REALIZADO EN TODOS LOS POSTS
      const filterComment = { "comments.idUser": idUser }; // CONDICION PARA EL QUERY
      const actualizacion = {
        $set: {
          "comments.$[element].nickname": dataPost.user.nickname,
          "comments.$[element].name": dataPost.user.name,
          "comments.$[element].imageUserUri": dataPost.user.imageUserUri
        }
      };

      const opciones = {
        session: session,
        arrayFilters: [{ "element.idUser": idUser }], // CONDION PARA EL ARREGLO
        multi: true // IMPORTANTE
      };
      const queryD = await postModel.updateMany(filterComment, actualizacion, opciones);


      await session.commitTransaction();
      // console.log(queryS)
      return "Actualización con exito"
    } catch (err) {
      await session.abortTransaction(); // ROLLBACK
      console.log(err)
      return "Hubo un error en el registro, intentalo más tarde."
    } finally {
      session.endSession();
      // console.log('se ejecuta finally');
    }
  }

}

module.exports = PostService;
