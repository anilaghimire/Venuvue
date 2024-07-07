import axios from "axios";
import loginmock from "../mock/loginmock";
import registermock from "../mock/registermock";
const backendURL = "http://localhost:5000";


describe("App Testing", () => {
  //Login
  it("POST /api/user/login | Login Successful", async () => {
    const response = await axios.post(
      `${backendURL}/api/user/login`,
      loginmock
    );
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
    expect(response.data.token).toBeDefined();
  });



  it("GET /api/product/get_product/ | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/product/get_product/`);
    expect(response.status).toBe(200);
  });
 it("GET /api/product/get_product/ | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/product/get_product/`);
    expect(response.data.message).toBe("All Products");
  });
  
  it("GET /api/product/get_product/ | Should work", async () => {
    const response = await axios.get(`${backendURL}/api/product/get_product/`);
    expect(response.data.products).toBeDefined();
  });


  it("DELETE /api/product/delete_product/:productId | Should work", async () => {
    const response = await axios.delete(`${backendURL}/api/product/delete_product/65ae226253f0770365e0e7a1`);
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Product deleted successfully.");
    expect(response.data.products).toBeDefined();
  });

  it("DELETE /api/cart/delete/:id | Should work", async () => {
    const response = await axios.delete(
      `${backendURL}/api/cart/delete/65e238d2d6382127185fc8f5`, 
    );
    expect(response.status).toBe(200);
    expect(response.data.message).toBe("Cart item deleted successfully");
    expect(response.data.product).toBeDefined();
  });
});