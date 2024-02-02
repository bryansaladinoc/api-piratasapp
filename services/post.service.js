const mongoose = require('mongoose');
const postSchema = require('../schemas/post.schema');
const boom = require('@hapi/boom');
const postModel = mongoose.model('posts', postSchema);

class PostService {
  async findAllPost(page) {
    const result = await postModel.aggregate([
      {
        "$match": {
          "user.status": 1 // Condición para campo1
          // Puedes agregar otras condiciones aquí
        },
      },
      {
        "$project": {
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
      {$sort: { createdAt: -1 }},
      { $skip: (page - 1) * 7},
      { $limit: 7 }
    ]);

    return await result;
  }

  async findPost(idPost) {
   // const result = await postModel.findOne({ "_id": idPost}).exec();
    const result = await postModel.aggregate([
      {
        "$match": {
          "_id": new mongoose.Types.ObjectId(idPost) // Condición para campo1
          // Puedes agregar otras condiciones aquí
        },
      },
      {
        "$project": {
          "user": 1,
          "_id": 1,
          "content": 1,
          "contentType": 1,
          "imageContent": 1,
          // "likes": 1,
          "createdAt": 1,
          // "countLikes": { "$size": '$likes' },
          // "countComments": { "$size": '$comments' }
        }
      }
    ]);
    return await result;
  }

  async countLikes(idPost) {
     const result = await postModel.aggregate([
       {
         "$match": {
           "_id": new mongoose.Types.ObjectId(idPost) // Condición para campo1
           // Puedes agregar otras condiciones aquí
         },
       },
       {
         "$project": {
           "_id": 1,
           "likes": 1,
           "countLikes": { "$size": '$likes' },
           "countComments": { "$size": '$comments' }
         }
       }
     ]);
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

  async findPostByUser(userId, page) {
    const result = await postModel.find({ "user.idUser": userId })
                                  .skip((page - 1) * 7)
                                  .limit(7)
                                  .sort({ 'createdAt': -1 })
                                  .exec();
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

  //ESTE METODO REGISTRA NUEVOS COMENTARIOS
  async createComment(dataPost) {
    const result = await postModel.updateMany({ "_id": dataPost.idPost }, { $push: { 'comments': dataPost.comments } });
    return await result;
  }

  async deleteComment(idpost, idcomment) {
    const result = await postModel.updateMany({ "_id": idpost }, { $pull: { "comments": { "_id": idcomment } } });
    return await result;
  }

  async commentsByPost(idPost, idUser) {
    const result = await postModel.findOne({ "_id": idPost }, "comments");

    result.comments.sort((a, b) => b.createdAt - a.createdAt);

    const _id = result._id;
    const commentsUser = result.comments.filter(item => item.idUser === idUser);
    const comments = result.comments.filter(item => item.idUser !== idUser);

    return { _id , commentsUser, comments};
  }
}



module.exports = PostService;
