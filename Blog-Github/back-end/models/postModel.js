const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        title: {
            type: String,
            require: [true, "Please add a title"]
        },
        description: {
            type: String,
            require: [true, "Please add a description"]
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Post', postSchema)