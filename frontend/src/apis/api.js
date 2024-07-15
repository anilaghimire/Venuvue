import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const config = () => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//console.log(config)

// Test API request
export const testApi = () => Api.get("/test");

// Create user API
export const createUserApi = (data) => Api.post("/api/user/create", data);

// Login user API
export const loginUserApi = (data) => Api.post("/api/user/login", data);

export const updateUser = (userId, userData) => Api.put(`/api/user/update/${userId}`,userData,config)

export const forgotPasswordApi = (data) => Api.post("/api/user/forgot", data,config);
export const resetPasswordApi = (data, token) => Api.put(`/api/user/password/reset/${token}`, data,config);
 

// Create product API
export const createProductApi = (data) =>
  Api.post("/api/product/create_product", data, config());

// Get all products API
export const getAllProductsApi = () => Api.get("/api/product/get_products");

// Get single product API
export const getSingleProductApi = (id) =>
  Api.get(`/api/product/get_product/${id}`);

// Update product API with id
export const updateProductApi = (id, formData) =>
  Api.put(`/api/product/update_product/${id}`, formData, config());

// Delete product API with id
export const deleteProductApi = (id) =>
  Api.delete(`/api/product/delete_product/${id}`, config());

// Delete cart product API with id
export const deleteCartProductApi = (id) =>
  Api.delete(`/api/cart/delete/${id}`, config());

// Get logged-in user details API
export const getLoggedInUserDetail = () => {
  const token = localStorage.getItem("token");
  return Api.get("/api/user/getUsers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add to cart API
export const addToCartAPI = (productId, quantity) =>
  Api.post("/api/addtocart", { productId, quantity }, config());

// Update logged-in user details API
export const updateLoggedInUserDetail = (id, userData) => {
  const token = localStorage.getItem("token");
  return Api.put(`/api/user/updateUser/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Booking APIs
export const createBookingAPI = (data) =>
  Api.post("/api/booking", data, config());

export const getBookingsAPI = () => Api.get("/api/booking", config());

export const getBookingAPI = (userId) => {
    return Api.get(`/api/booking/user/${userId}/bookings`, config());
  };
export const updateBookingAPI = (id, data) =>
  Api.put(`/api/booking/${id}`, data, config());

export const deleteBookingAPI = (id) =>
  Api.delete(`/api/booking/${id}`, config());
