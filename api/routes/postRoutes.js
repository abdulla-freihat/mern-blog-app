const express = require('express');
const verifyToken = require('../utils/verifyUser');

const {createPost , getAllPosts} = require('../controllers/postController');



const router = express.Router();


router.post('/create' , verifyToken , createPost)
router.get('/all-posts' ,getAllPosts )


module.exports = router;
