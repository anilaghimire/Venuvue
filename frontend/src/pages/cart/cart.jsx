import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {deleteCartProductApi } from "../../apis/api";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const getCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.data;
      const itemsWithQuantity = data.cart.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCartItems(itemsWithQuantity);
      updateTotalItemsAndPrice(itemsWithQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTotalItemsAndPrice = (items) => {
    const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPriceCount = items.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    );
    setTotalItems(totalItemsCount);
    setTotalPrice(totalPriceCount);
  };

  const removeCartItem = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this booking from your cart?"
    );
    if (!confirm) {
      return;
    } else {
      deleteCartProductApi(id).then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          window.location.reload();
        }
      });
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

  return (
    <div className="container-fluid" style={{ backgroundColor: "#bd8364", paddingTop: "50px", paddingBottom: "50px" }}>
      <div className="container">
        <h1 className="text-center mb-4" style={{ color: "#563d2d" }}>My Cart</h1>
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((cart, index) => (
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
            ))}
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
                <Link to="/checkout" className="btn btn-primary btn-block">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;