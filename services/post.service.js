const mongoose = require('mongoose');
const postSchema = require('../schemas/post.schema');
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
    const result = new postModel({ ...dataPost });
    await result.save();
    return result;
  }

  async deletePost(idPost) {
    const result = await postModel.deleteOne({ "_id": idPost });
    console.log(result)
    return idPost;
  }

  async findPostByUser(userId) {
    const result = await postModel.find({ "user.idUser": userId }).exec();
    return await result;
  }

  async likePostByUser(dataPost) {
    const result = await postModel.updateMany({ "_id": dataPost.idPost }, { $push: { 'likes': dataPost.likes } });
    return result;
  }

  async deleteLikePostByUser(idpost, iduser) {
    const result = await postModel.updateMany({ "_id": idpost }, { $pull: { "likes": { "idUser": iduser } } });
    return result;
  }

  //LOS COMENTARIOS POR USUARIO EN EL POST SE OBTENDRAN DESDE EL FROND
  //ESTE METODO REGISTRA NUEVOS COMENTARIOS
  async commentsByPost(dataPost) {
    const result = await postModel.updateMany({ "_id": dataPost.idPost }, { $push: { 'comments': dataPost.comments } });
    return result;
  }

  async deleteCommentByUSer(idpost, idcomment) {
    const result = await postModel.updateMany({ "_id": idpost }, { $pull: { "comments": { "_id": idcomment } } });
    return result;
  }


  async updateCollection(idUser, dataPost) {
    try {
      /* const session = await postModel.startSession()

      await session.withTransaction(async () => {

        await postModel.updateMany({ "user.idUser": idUser }, { "user.nickname": dataPost.user.nickname }, { session: session });

        await session.endSession(); */

        let Usession = null;
        return postModel.createCollection().
          then(() => mongoose.startSession()).
          then( _session => {
            Usession = _session;
            Usession.startTransaction();
            return postModel.updateMany({ "user.idUser": idUser }, { "user.nickname": dataPost.user.nickname }, { session: Usession })
          }).
          then(() => Usession.commitTransaction()).
          then(() => Usession.endSession());

        /* const findPostByUser = await this.findPostByUser(idUser);*/
      /* }); */
    } catch (err) {
      console.log(err)
    }
    return "ok"
  }

}

module.exports = PostService;
