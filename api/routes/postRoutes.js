const express = require('express');
const verifyToken = require('../utils/verifyUser');

const {createPost , getAllPosts , deletePost} = require('../controllers/postController');



const router = express.Router();


router.post('/create' , verifyToken , createPost)
router.get('/all-posts' ,getAllPosts )
router.delete('/delete/:id' , verifyToken  , deletePost)


module.exports = router;
