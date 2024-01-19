const mongoose = require('mongoose');
const postSchema = require('../schemas/post.schema');
const postModel = mongoose.model('posts', postSchema);


class PostService {
    async findAllPost() {
        const result = await postModel.find({ "user.status": 1 }).exec();
        return await result;
    }

    async findPost(idPost) {
        const result = await postModel.find({ "id": idPost, "user.status": 1 }).exec();
        /*  const comentarios = querySelectOne.comments; // Obtiene el arreglo de objetos de comentarios por publicacion
         console.log(Object.keys(comentarios).length); // Obtiene el numero total de comentarios*/
        return await result;
    }

    async createPost(dataPost) {
        const result = new postModel({...dataPost});
        await result.save();
        return result;
    }

    async deletePost(idPost){
      const result = await postModel.deleteOne({ "_id": idPost });
      console.log(result)
      return idPost;
    }

    async findPostByUser(userId) {
      const result = await postModel.find({ "user.id" : userId }).exec();
      return await result;
  }

  async likePostByUser(dataPost) {
    console.log(dataPost.idPost)
    const result = await postModel.updateOne({ "_id": dataPost.idPost }, { 'likes': dataPost.likes });
    return result;
}


}

module.exports = PostService;
