const express = require('express');
const {test , updateUser} = require('../controllers/userController')
const verifyToken = require('../utils/verifyUser');


const router = express.Router();


router.get('/test' , test)
router.put('/update/:id' , verifyToken , updateUser)



module.exports = router;




