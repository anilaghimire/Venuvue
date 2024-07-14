const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authGuard } = require("../middleware/authGuard");

router.post('/',authGuard, bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/user/:userId/bookings', bookingController.getBooking);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);
 
module.exports = router;