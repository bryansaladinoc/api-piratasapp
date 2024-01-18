
const { UUID } = require('bson');
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    createdAt: Date,
    user: {
        id: String,
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
            _id: String,
            nickname: String,
            name: String,
            imageUserUri: String,
            comment: String
        }
    ],
    likes: [
        {
            userId: String
        }
    ]
});

module.exports = postSchema;