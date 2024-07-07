// importing 
const router = require('express').Router();
const userController = require('../controllers/userController');



router.post('/create', userController.createUser) 



router.post('/login', userController.loginUser)

// export
module.exports = router;