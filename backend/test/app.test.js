//  //fetching single product
 const request = require('supertest');
 const app = require('../index')

 describe("API Endpoints Testing", () => {
  it('/GET/api/product/get_products| Response should be json', async () =>{
      const response = await request (app)
      .get('/api/product/get_products')
  });
  it('/DELETE/api/product/delete_product/:productId | Response should be json', async () =>{
    const response = await request (app)
    .delete('/api/product/delete_product/65ae226253f0770365e0e7a1');
  });
  
  it('/DELETE/api/cart/delete/:id | Response should be json', async () =>{
    const response = await request (app)
    .delete('api/cart/delete/ 65ae226253f0770365e0e7a1');
});

//add to cart 
it('/GET/api/cart/addtocart| Response should be json', async () =>{
  const response = await request (app)
  .get('/api/cart/addtocart')
});


   // Register User
   it("POST /api/user/create | Response with success message", async () => {
    const response = await request(app).post("/api/user/create").send({
      firstName: "ffffhff",
      lastName: "sgbffvfvs",
      email: "ain@ggvgmail.com ",
      password: "dgbvffnfvbvffsdg", 
    });
    if (response.body.success) {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual("User created successfully");
      } else {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual("User already exists");
      }
    });



it("POST /api/user/login |  Response with valid JSON", async () => {
  const response = await request(app).post("/api/user/login").send({
    email: "admin@gmail.com",
    password: "admin",
  });
  expect(response.statusCode).toBe(200);
}, 40000);

//product
it("POST /api/product/create_product | Response with success message", async () => {
  const response = await request(app).post("/api/product/create_product").send({
    productName: "t-shirt",
    productPrice: "2424",
    productCategory: "t-shirt",
    productDescription: "dgbvfsdg", 
  });
  if (response.body.success) {
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("Product created successfully");
  } else {
    expect(response.body.success).toBe(false);
  
  }

});

});