import React from 'react';
//import '../styles/FeaturePage.css'; // Import your CSS file for styling

const FeaturePage = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: '---',
      price: 19.99,
      imageUrl: 'path-to-product1-image.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      description: '----.',
      price: 29.99,
      imageUrl: 'path-to-product2-image.jpg',
    },
    // Add more products as needed
  ];

  return (
    <div className="feature-page">
      <h1>Featured Products</h1>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturePage;