const express = require('express');
const {test , updateUser ,  deleteUser , getUsers} = require('../controllers/userController')
const verifyToken = require('../utils/verifyUser');


const router = express.Router();


router.get('/test' , test)
router.put('/update/:id' , verifyToken , updateUser)
router.delete('/delete/:id' , verifyToken , deleteUser)
router.get('/getUsers' , verifyToken , getUsers)



module.exports = router;




