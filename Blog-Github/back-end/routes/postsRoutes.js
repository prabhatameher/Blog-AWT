const express = require('express')
const router = express.Router()
const { getPosts, setPost, deletePost, updatePost, getSinglePost, getPublicPosts, getPublicSinglePost, commentPost, likePost, savePost, removeSavedPost, removeLikedPost } = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')

// const { getPosts, setPost, updatePost, deletePost } = require

// router.get('/', getPosts)
// router.post('/', setPost)
// router.delete('/:id', deletePost)
// router.put('/:id', updatePost)
router.route('/').get(getPublicPosts)
router.route('/comment-post/:id').post(protect, commentPost)
router.route('/like-post/:id').post(protect, likePost)
router.route('/remove-like-post/:id').post(protect, removeLikedPost)
router.route('/save-post/:id').post(protect, savePost)
router.route('/remove-save-post/:id').post(protect, removeSavedPost)
router.route('/specific-post-guest').post(getPublicSinglePost)
router.route('/user-post').get(protect, getPosts).post(protect, setPost)
router.route('/specific-post').post(protect, getSinglePost)
router.route('/user-post/:id').delete(protect, deletePost).put(protect, updatePost)


module.exports = router;