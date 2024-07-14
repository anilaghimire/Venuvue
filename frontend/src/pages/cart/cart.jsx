import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { deleteCartProductApi } from "../../apis/api";
import { toast } from "react-toastify";
import image from '../../images/saved.png'; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateTotalItemsAndPrice = (items) => {
    const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPriceCount = items.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    );
    setTotalItems(totalItemsCount);
    setTotalPrice(totalPriceCount);
  };

  const getCartItems = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      console.log("API Response:", data); // Log the response to check the data structure
      if (data.cart && Array.isArray(data.cart)) {
        const itemsWithQuantity = data.cart.map((item) => ({
          ...item,
          quantity: 1,
        }));
        console.log("Processed Cart Items:", itemsWithQuantity); // Log processed items
        setCartItems(itemsWithQuantity);
        updateTotalItemsAndPrice(itemsWithQuantity);
      } else {
        console.error("Invalid cart data structure");
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, []);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const removeCartItem = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item ?"
    );
    if (!confirm) {
      return;
    } else {
      try {
        const res = await deleteCartProductApi(id);
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          getCartItems(); // Fetch cart items again after deletion
        }
      } catch (error) {
        console.error("Error deleting favourite item:", error);
      }
    }
  };

  const incrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
    updateTotalItemsAndPrice(updatedCartItems);
  };

  const decrementQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
      updateTotalItemsAndPrice(updatedCartItems);
    }
  };

  console.log("Cart Items State:", cartItems); // Log cartItems to see its state

  return (
    <div className="container-fluid" style={{ backgroundColor: "#ffffff", paddingTop: "50px", paddingBottom: "50px" }}>
      {/* Static Image Section */}
      <div className="w-100 mb-4" style={{ height: "50vh", overflow: "hidden" }}>
        <img src={image} alt="Static" className="img-fluid w-100" style={{ objectFit: "cover", height: "100%" }} />
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {cartItems.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              cartItems.map((cart, index) => (
                <div key={index} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={cart.productImg}
                        alt={cart.productName}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{cart.productName}</h5>
                        <p className="card-text mb-1">
                          <strong>Price:</strong> ${cart.productPrice}
                        </p>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => decrementQuantity(index)}
                          >
                            -
                          </button>
                          <span className="me-2">{cart.quantity}</span>
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => incrementQuantity(index)}
                          >
                            +
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeCartItem(cart._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Cart Summary</h2>
                <hr />
                <p className="mb-1">
                  Total Items:{" "}
                  <span className="badge bg-primary">{totalItems}</span>
                </p>
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                {/* <Link to="/checkout" className="btn btn-primary btn-block">
                  Proceed to Checkout
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
