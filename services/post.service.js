const mongoose = require('mongoose');
const postSchema = require('../schemas/post.schema');
const boom = require('@hapi/boom');
const model = mongoose.model('posts', postSchema);


class PostService {

  async createPost(dataPost) {
    const result = await new model(
      { ...dataPost });
    await result.save();
    console.log('createPost ' + result._id);
    return await result;
  }

  async findPostByUser(userId, page) {
    const result = await model.aggregate([
      { "$match": { "user": new mongoose.Types.ObjectId(userId) } },
      { "$sort": { "createdAt": -1 } },
      { "$skip": (page - 1) * 30 },
      { "$limit": 30 },
      {
        "$lookup": {
          "from": "users", // Reemplaza con el nombre de tu colección de usuarios
          "localField": "user",
          "foreignField": "_id",// Campos que quieres obtener del usuario
          "as": "user"
        }
      },
      { "$unwind": "$user" },
      {
        "$project": {
          "user": {
            "_id": 1,
            "name": 1,
            "nickname": 1,
            "image": 1,
          },
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
    ]);

    console.log('postUser ' + result.length);
    return await result;
  }



  async findAllPost(page) {
    const result = await model.aggregate([
      {
        "$lookup": {
          "from": "users",
          "localField": "user",
          "foreignField": "_id",
          "as": "userDetails",
        },
      },
      { "$unwind": "$userDetails" },
      {
        "$project": {
          "user": {
            "_id": { "$ifNull": ["$userDetails._id", null] },
            "name": { "$ifNull": ["$userDetails.name", null] },
            "nickname": { "$ifNull": ["$userDetails.nickname", null] },
            "image": { "$ifNull": ["$userDetails.image", null] },
            "status": { "$ifNull": ["$userDetails.status", []] },
          },
          "_id": 1,
          "content": 1,
          "contentType": 1,
          "imageContent": 1,
          "likes": 1,
          "createdAt": 1,
          "countLikes": { "$size": '$likes' },
          "countComments": { "$size": '$comments' },
        },
      },
      {
        "$match": {
          "user.status": {
            "$not": {
              "$elemMatch": {
                "name": "posts",
                "value": false
              }
            }
          }
        }
      },
      { "$sort": { "createdAt": -1 } },
      { "$skip": (page - 1) * 30 },
      { "$limit": 30 },
    ]);
    console.log('allPost ' + result.length);
    return await result;
  }

  async findLastPostUser(userId) {
    const result = await model.aggregate([
      { "$match": { "user": new mongoose.Types.ObjectId(userId) } },
      { "$sort": { "createdAt": -1 } },
      { "$limit": 1 },
      {
        "$lookup": {
          "from": "users", // Reemplaza con el nombre de tu colección de usuarios
          "localField": "user",
          "foreignField": "_id",// Campos que quieres obtener del usuario
          "as": "user"
        }
      },
      { "$unwind": "$user" },
      {
        "$project": {
          "user": {
            "_id": 1,
            "name": 1,
            "nickname": 1,
            "image": 1,
          },
          "_id": 1,
          "content": 1,
          "contentType": 1,
          "imageContent": 1,
          "likes": 1,
          "createdAt": 1,
          "countLikes": { "$size": '$likes' },
          "countComments": { "$size": '$comments' }
        }
      }
    ]);
    console.log('lastPostUser ' + result.length);
    return await result;
  }


  //ESTE METODO REGISTRA NUEVOS COMENTARIOS
  async createComment(data, idUser) {
    data.comments.user = idUser;
    data.comments.createdAt = new Date();
    const result = await model.updateMany({ "_id": data.idPost }, { $push: { 'comments': data.comments } });
    return await result;
  }



  async findPost(idPost) {
    // const result = await model.findOne({ "_id": idPost}).exec();
    const result = await model.aggregate([
      {
        "$match": {
          "_id": new mongoose.Types.ObjectId(idPost) // Condición para campo1
          // Puedes agregar otras condiciones aquí
        },
      },
      {
        "$lookup": {
          "from": "users", // Reemplaza con el nombre de tu colección de usuarios
          "localField": "user",
          "foreignField": "_id",// Campos que quieres obtener del usuario
          "as": "user"
        }
      },
      { "$unwind": "$user" },
      {
        "$project": {
          "user": {
            "_id": 1,
            "name": 1,
            "nickname": 1,
            "image": 1,
          },
          "_id": 1,
          "content": 1,
          "contentType": 1,
          "imageContent": 1,
          // "likes": 1,
          "createdAt": 1,
          "countLikes": { "$size": '$likes' },
          "countComments": { "$size": '$comments' }
        }
      }
    ]);
    console.log(result);
    if (result.length === 0) {
      throw boom.notFound('Post not found');
    }
    return await result;
  }

  async commentsByPost(idPost, page) {
    const result = await model.findOne({ "_id": idPost }, 'comments')
      .populate({
        path: 'comments.user',
        model: 'user',  // Asegúrate de usar el mismo nombre de modelo que en tus esquemas
        select: 'name nickname image'  // Poblado para obtener detalles básicos del usuario
      })
      .exec();

    const commentsPage = result.comments
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice((page - 1) * 5, page * 5);

    return await commentsPage;
  }

  async deleteLikePostByUser(idpost, iduser) {
    const result = await model.updateMany({ "_id": idpost }, { $pull: { "likes": { "idUser": iduser } } });
    return await result;
  }

  async likePostByUser(dataPost, idUser) {
    dataPost.likes = {
      idUser: idUser,
    };
    const result = await model.updateMany({ "_id": dataPost.idPost }, { $push: { 'likes': dataPost.likes } });
    return await result;
  }

  async deletePost(idPost) {
    const result = await model.deleteOne({ "_id": idPost });
    return await result;
  }

  async deleteComment(idpost, idcomment) {
    const result = await model.updateMany({ "_id": idpost }, { $pull: { "comments": { "_id": idcomment } } });
    return await result;
  }

  async updateImagePosts(image) {
    const result = await model.updateMany({}, { $set: { "imageContent": image } });
    return await result;
  }


}



module.exports = PostService;
