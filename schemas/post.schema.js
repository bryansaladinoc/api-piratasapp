const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    createdAt: Date,
    user: {
        idUser: String,
        nickname: String,
        name: String,
        imageUserUri: String,
        status: Number
    },
    content: String,
    contentType: String,
    imageContent: String,
    comments: [
        {
            idUser: String,
            nickname: String,
            name: String,
            imageUserUri: String,
            comment: String
        }
    ],
    likes: [
        {
            idUser: String
        }
    ]
});

module.exports = postSchema;