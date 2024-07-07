const mongoose = require('mongoose');
const CartItem = require('../model/cartModel');
const Products = require("../model/productModel");

// Controller to add item to cart
const addtocart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Extract userId from authenticated user  
    console.log(userId);

    // Validate productId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid productId' });
    }

    // Create a new CartItem instance with userId
    const cartItem = new CartItem({ productId: new mongoose.Types.ObjectId(productId), quantity, userId });

    await cartItem.save();
    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find({userId: req.user.id});
    let cart = [];
    console.log("ok")
    for(let i=0; i<cartItems.length; i++) {
      let cartItem = cartItems[i];
      let product = await Products.findById(cartItem.productId);
      let item = {
        _id: cartItem._id,
        productImg: product.productImageUrl,
        productName: product.productName,
        productPrice: product.productPrice
      };
      cart.push(item)
    }
    return res.json({message: 'success', cart})
  } catch (error) {
    
  }
}
const deleteCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const deletedCartItem = await CartItem.findByIdAndDelete(cartItemId);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addtocart,
  getCartItems,
  deleteCartItem
};