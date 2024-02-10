const express = require('express');
const verifyToken = require('../utils/verifyUser');

const {createPost , getAllPosts , deletePost , getSinglePost , updatePost} = require('../controllers/postController');



const router = express.Router();


router.post('/create' , verifyToken , createPost)
router.get('/all-posts' ,getAllPosts )
router.delete('/delete/:postId/:userId' , verifyToken  , deletePost)
router.get('/get-post/:slug' , getSinglePost)
router.put('/update/:postId/:userId' , verifyToken , updatePost)

module.exports = router;
