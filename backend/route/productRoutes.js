const router = require('express').Router();
const productController = require('../controllers/productController');
const { authGuardAdmin } = require('../middleware/authGuard');


//creating product API 
router.post('/create_product',authGuardAdmin, productController.createProduct)

//get all products API
router.get("/get_products", productController.getAllProducts)

//get single product api
router.get("/get_product/:id/", productController.getSingleProduct)

//update product api
router.put("/update_product/:id", authGuardAdmin, productController.updateProduct)

//Deleting product api
router.delete("/delete_product/:id",authGuardAdmin, productController.deleteProduct)

//create order api
router.post("/create_order", productController.createOrder)

// //get all orders api
// router.get("/get_orders", productController.getOrders)

module.exports = router;































































// router.get("/get_orders", productController.getOrders)
// router.get("/get_orders", productController.getOrders)
// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)// router.get("/get_orders", productController.getOrders)
// router.get("/get_orders", productController.getOrders)