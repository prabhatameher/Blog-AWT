const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')


const getPublicPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ postType: 'public' })
    res.status(200).json(posts)
})


const getPublicSinglePost = asyncHandler(async (req, res) => {
    console.log(req.body)

    const specificPost = await Post.findOne({ $and: [{ _id: req.body.postId }, { postType: 'public' }] })

    console.log(specificPost)

    res.status(200).json(specificPost)
})

//@desc GET POSTS
//@route GET /api/posts
//@access private

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ $or: [{ user: req.user.id }, { postType: 'public' || 'private' }] })

    res.status(200).json(posts)
})


//@desc GET SINGLE POST
//@route GET /api/single_post
//@access private

const getSinglePost = asyncHandler(async (req, res) => {
    console.log(req.body)

    const user = await User.findById(req.user.id)
    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User Not found')
    }

    const specificPost = await Post.findOne({ _id: req.body.postId })

    console.log(specificPost)

    res.status(200).json(specificPost)
})


//@desc set POSTS
//@route POST /api/posts
//@access private

const setPost = asyncHandler(async (req, res) => {
    if (!req.body.title && !req.body.description) {

        res.status(400)
        throw new Error('Field is Missing')
    }

    const post = await Post.create({
        user: req.user.id,
        userName: req.body.userName,
        postType: req.body.postType,
        title: req.body.title,
        description: req.body.description,
    })
    res.status(200).json(post)
})

//@desc update POSTS
//@route PUT /api/posts/:id
//@access private

const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('Post not Found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User Not found')
    }

    //Make sure logged in user matches  the post user
    if (post.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not Authorized')
    }

    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatePost)

})

//@desc delete POSTS
//@route DELETE /api/posts/:id
//@access private

const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        res.status(400)
        throw new Error('Post not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User Not found')
    }

    //Make sure logged in user matches  the post user
    if (post.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not Authorized')
    }

    await post.remove()
    await res.status(200).json({ 'message': 'Post deleted Successfully' })

})


const commentPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    const { userId, name, comment } = req.body

    if (!post) {
        res.status(400)
        throw new Error('Post not Found')
    }

    const user = await User.findById(userId)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User Not found')
    }

    // const postComment = await Post.findByIdAndUpdate(req.params.id, { $addToSet: { comments: { userId: userId, name: name, comment: comment } } })

    // can also be written as 
    const postComment = await Post.findByIdAndUpdate(req.params.id, { $addToSet: { comments: { userId, name, comment } } })

    res.status(200).json(postComment)

})
const likePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    const { userId } = req.body

    if (!post) {
        res.status(400)
        throw new Error('Post not Found')
    }

    const user = await User.findById(userId)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User Not found')
    }

    const postLike = await Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: userId } })

    res.status(200).json(postLike)

})

const removeLikedPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    const { userId } = req.body

    if (!post) {
        res.status(400)
        throw new Error('Post not Found')
    }

    const user = await User.findById(userId)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User Not found')
    }

    const postSave = await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: userId } })

    res.status(200).json(postSave)

})


const savePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    const { userId } = req.body

    if (!post) {
        res.status(400)
        throw new Error('Post not Found')
    }

    const user = await User.findById(userId)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User Not found')
    }

    const postSave = await Post.findByIdAndUpdate(req.params.id, { $addToSet: { saved: userId } })

    res.status(200).json(postSave)

})

const removeSavedPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    const { userId } = req.body

    if (!post) {
        res.status(400)
        throw new Error('Post not Found')
    }

    const user = await User.findById(userId)

    //check for user
    if (!user) {
        res.status(401)
        throw new Error('User Not found')
    }

    const postSave = await Post.findByIdAndUpdate(req.params.id, { $pull: { saved: userId } })

    res.status(200).json(postSave)

})



module.exports = {
    getPublicPosts,
    getPublicSinglePost,
    getPosts,
    setPost,
    getSinglePost,
    updatePost,
    deletePost,
    commentPost,
    likePost,
    savePost,
    removeSavedPost,
    removeLikedPost,
}