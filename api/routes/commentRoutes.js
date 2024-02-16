const express = require('express');
const {createComment , getPostComments , likeComment}  = require('../controllers/commentController')
const verifyToken = require('../utils/verifyUser');


const router = express.Router();





router.post('/create' , verifyToken, createComment)
router.get('/getPostComments/:postId' , getPostComments);
router.put('/likeComment/:commentId' , verifyToken , likeComment)




module.exports = router;