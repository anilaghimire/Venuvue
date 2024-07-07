import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getSingleProductApi } from '../apis/api';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



const ProductDetailPage = () => {
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  const addToCart = async (productDetails) => {
    try {
      console.log("dfdf");
      await axios.post('http://localhost:5000/api/cart/addtocart', {
        productId: productDetails._id,
        quantity: 1
      }, {headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }})
      toast.success('Item added to cart')
    } catch (error) {
      toast.error('Failed adding to cart')
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#bd8364', padding: '20px' }}>
      <div className="row">
        <div className="col-md-4">
          <div className="card border-0">
            <img src={productDetails.productImageUrl} alt={productDetails.productName} className="card-img-top" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card border-0" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
            <div className="card-body">
              <h2 className="card-title">{productDetails.productName}</h2>
              <p className="card-text text-muted">Price: Rs.{productDetails.productPrice}</p>
              <p className="card-text">{productDetails.productDescription}</p>
              <button className="btn btn-primary" onClick={() => addToCart(productDetails)}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
