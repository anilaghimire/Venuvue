import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getSingleProductApi } from '../apis/api';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/ProductDetail.css'; // Importing CSS file for styling
import Footer from '../components/footer'; // Importing the Footer component

const ProductDetailPage = () => {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams(); // Accessing the id parameter from the route

  useEffect(() => {
    // Fetch product details when the component mounts
    getSingleProductApi(id)
      .then((res) => {
        setProductDetails(res.data.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details: ', error);
        setError('Error fetching product details. Please try again.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // loading spinner component
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const isLoggedIn = () => {
    return !!localStorage.getItem('token'); // Check if token exists in localStorage
  };

  const handleUnauthenticated = () => {
    toast.warn('Please log in first');
    navigate('/login'); // Redirect to login page if not logged in
  };

  const addToCart = async (productDetails) => {
    if (!isLoggedIn()) {
      handleUnauthenticated();
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/addtocart', {
        productId: productDetails._id,
        quantity: 1
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Item added to favourite');
      // navigate('/cart');
    } catch (error) {
      toast.error('Failed adding to favourite');
    }
  };

  const proceedBooking = () => {
    if (!isLoggedIn()) {
      handleUnauthenticated();
      return;
    }
    navigate('/booking');
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="product-detail-page">
        <div className="product-detail-container">
          <h1 className="page-title">Product Details</h1>
          <div className="product-grid">
            <div className="product-image-section">
              <img src={productDetails.productImageUrl} alt={productDetails.productName} className="product-image" />
            </div>
            <div className="product-details-section">
              <h1 className="product-title">{productDetails.productName}</h1>
              <p className="product-price">Rs.{productDetails.productPrice}</p>
              <p className="product-description">{productDetails.productDescription}</p>

              <div className="pricing-box">
                <h2>Pricing</h2>
                <p>Up to 100 guests - 2800 per plate</p>
                <p>Up to 200 guests - 2400 per plate</p>
                <p>Up to 300 guests - 2100 per plate</p>
              </div>

              <div className="services-box">
                <h2>Services</h2>
                <p>Allowed to bring own alcoholic beverage</p>
                <p>DJ Service</p>
                <p>Allowed to bring own DJ</p>
                <p>Private Parking for 30 Cars</p>
                <p>Changing Room</p>
                <p>Firecrackers Allowed</p>
                <p>Projectors</p>
                <p>Outside Catering Allowed</p>
                <p>Decoration Service</p>
              </div>
            </div>
          </div>

          <div className="button-container">
            <button className="save-banquet-button" onClick={() => addToCart(productDetails)}>Save Banquet</button>
            <button className="proceed-booking-button" onClick={proceedBooking}>Proceed Booking</button>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=Times+Square,+New+York,+NY,+USA&hl=es;z=14&output=embed"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ProductDetailPage;
