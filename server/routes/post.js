const express = require('express')
const { requireSignin } = require('../controllers/auth')
const { 
    getPosts, 
    createPost, 
    postByUser, 
    postById, 
    isPoster, 
    deletePost, 
    updatePost, 
    photo, 
    singlePost, 
    like, 
    unlike,
    comment,
    uncomment 
} = require('../controllers/post')
const { userById } = require('../controllers/user')
const { createPostValidator } = require('../validator')

const router = express.Router()

router.get('/posts',  getPosts)

// like unlike
router.put('/post/like', requireSignin, like)
router.put('/post/unlike', requireSignin, unlike)

// comments
router.put('/post/comment', requireSignin, comment)
router.put('/post/uncomment', requireSignin, uncomment)

// post routes
router.get('/posts/by/:userId', postByUser)
router.get('/post/:postId', singlePost)
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)
router.put('/post/:postId', requireSignin, isPoster, updatePost)

// photo
router.get("/post/photo/:postId", photo)


// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);

module.exports = router