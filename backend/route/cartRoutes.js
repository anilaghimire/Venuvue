const router = require('express').Router();
const bodyParser = require("body-parser");
const cartController = require("../controllers/cartController");
const { authGuard } = require("../middleware/authGuard");

// Parse incoming request bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Define the route to add item to cart
router.post('/addtocart', authGuard, cartController.addtocart);

// Define the route to get cart items
router.get('/', authGuard, cartController.getCartItems);

// DELETE request to delete a cart item by ID
router.delete('/delete/:id', authGuard, cartController.deleteCartItem);

module.exports = router;
