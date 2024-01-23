const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
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
            comment: String,
            createdAt: Date
        }
    ],
    likes: [
        {
            idUser: String
        }
    ]
},  { timestamps: true });

module.exports = postSchema;