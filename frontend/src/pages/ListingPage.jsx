import React, { useState, useEffect } from 'react';
import { getAllProductsApi } from '../apis/api';
import { Link } from 'react-router-dom';
import '../style/ListingPage.css';
import Footer from '../components/footer';

const ListingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error('Error fetching products: ', error);
      });
  }, []);

  return (
    <div className="listing-container">
      <h1 className="listing-heading">Banquets</h1>
      <div className="listing-section">
        {products.map((product) => (
          <div key={product._id} className="listing-item">
            <img src={product.productImageUrl} alt={product.productName} className="listing-img" />
            <div className="listing-details">
              <h2 className="listing-title">{product.productName}</h2>
              <p className="listing-text">• Seat Capacity: {product.seatCapacity} people</p>
              <p className="listing-text">• Space Preference: {product.spacePreference}</p>
              <p className="listing-text">• Service Location: {product.serviceLocation}</p>
              <Link to={`/product/${product._id}`} className="listing-button">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ListingPage;
