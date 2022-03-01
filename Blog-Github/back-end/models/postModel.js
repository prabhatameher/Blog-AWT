const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        userName: {
            type: String,
            require:true,
        },
        title: {
            type: String,
            require: [true, "Please add a title"]
        },
        description: {
            type: String,
            require: [true, "Please add a description"]
        },
        postType: {
            type: String,
            require: [true, "Please add post Type"]
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Post', postSchema)