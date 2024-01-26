const mongoose = require('mongoose');
const postSchema = require('../schemas/post.schema');
const boom = require('@hapi/boom');
const postModel = mongoose.model('posts', postSchema);



class PostService {
  async findAllPost() {
    const result = postModel.aggregate([
      {
        "$match": {
          "user.status": 1 // Condición para campo1
          // Puedes agregar otras condiciones aquí
        },
      },
      {
        "$project": {
          "user": 1,
          "user": 1,
          "_id": 1,
          "content": 1,
          "contentType": 1,
          "imageContent": 1,
          "likes": 1,
          "createdAt": 1,
          "countLikes": { "$size": '$likes' },
          "countComments": { "$size": '$comments' }
        }
      },
      {
        $sort: { createdAt: -1 } // Ordena los resultados por el campo 'createdAt' en orden descendente
      }
    ]);

    
    /* await postModel.find({ "user.status": 1 }, 
     "user _id content contentType imageContent  likes createdAt"
    ).sort({ ["createdAt"]: 'desc' }).exec(); */
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
}

module.exports = PostService;
