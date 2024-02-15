const express = require('express');
const {test , updateUser ,  deleteUser , getUsers , getUser} = require('../controllers/userController')
const verifyToken = require('../utils/verifyUser');


const router = express.Router();


router.get('/test' , test)
router.put('/update/:id' , verifyToken , updateUser)
router.delete('/delete/:id' , verifyToken , deleteUser)
router.get('/getUsers' , verifyToken , getUsers)

//this route for the users in the post comments section
router.get('/:userId' , verifyToken , getUser)



module.exports = router;




