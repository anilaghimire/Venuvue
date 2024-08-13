// importing 
const router = require('express').Router();
const userController = require('../controllers/userController');
const rateLimit = require('express-rate-limit');

// Rate Limiting
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many login attempts, please try again after 15 minutes"
});

router.post('/create', userController.createUser) 



router.post('/login', userController.loginUser)

router.get("/verify/:id", userController.verifyMail);

router.put("/update/:id", userController.updateUserProfile);

router.post("/forgot", userController.forgotPassword);
router.put("/password/reset/:token", userController.resetPassword);

// export
module.exports = router;