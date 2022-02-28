const express = require('express')
const router = express.Router()
const { getPosts, setPost, deletePost, updatePost, getSinglePost } = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')

// const { getPosts, setPost, updatePost, deletePost } = require

// router.get('/', getPosts)
// router.post('/', setPost)
// router.delete('/:id', deletePost)
// router.put('/:id', updatePost)
router.route('/').get(protect, getPosts).post(protect, setPost)
router.route('/specific-post').post(protect, getSinglePost)
router.route('/:id').delete(protect, deletePost).put(protect, updatePost)


module.exports = router;