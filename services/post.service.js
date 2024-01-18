const mongoose = require('mongoose');
const postSchema = require('../schemas/post.schema');
const postModel = mongoose.model('posts', postSchema);


class PostService {
    async findAllPost() {
        const querySelect = await postModel.find({ "user.status": 1 }).exec();
        return await querySelect;
    }

    async findPost(id) {
        const querySelectOne = await postModel.find({ "_id": id, "user.status": 1 }).exec();
        /*  const comentarios = querySelectOne.comments; // Obtiene el arreglo de objetos de comentarios por publicacion
         console.log(Object.keys(comentarios).length); // Obtiene el numero total de comentarios*/
        return await querySelectOne;
    }

    async createPost(dataPost) {

        console.log(dataPost)

        const post = new postModel({...dataPost});

        await post.save(); 

        return post;
    }
}

module.exports = PostService;