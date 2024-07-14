// importing 
const router = require('express').Router();
const userController = require('../controllers/userController');



router.post('/create', userController.createUser) 



router.post('/login', userController.loginUser)

router.get("/verify/:id", userController.verifyMail);

router.put("/update/:id", userController.updateUserProfile);

router.post("/forgot/password", userController.forgotPassword);
router.put("/password/reset/:token", userController.resetPassword);

// export
module.exports = router;