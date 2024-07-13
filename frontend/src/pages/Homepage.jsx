import React, { useState, useEffect } from 'react';
import { getAllProductsApi } from '../apis/api'
import { Link } from 'react-router-dom';
import '../style/Homepage.css';

import homepageImage from '../images/home_bg.jpg';
import serviceImage1 from '../images/wedding.jpeg';
import serviceImage2 from '../images/seminar.jpeg';
import serviceImage3 from '../images/birthday.jpeg';
import aboutImage from '../images/about.jpg'; 
import Footer from '../components/footer';
import FAQPage from './FAQ';


const HomePage = () => {
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
    <div>
      <div className="top-div">
        <div className="flex-container">
          <img src={homepageImage} alt="homepage" className="homepage-image" />
        </div>
      </div>

      <div className="container">
        <h1 className="heading">Services we provide</h1>
        <div className="services-section">
          <div className="row">
            <div className="col-md-4 mb-4">
              <Link to="/service1" className="service-link">
                <div className="card">
                  <img src={serviceImage1} className="card-img-top" alt="Service 1" />
                  <div className="card-body">
                    <h5 className="card-title">Wedding and Receptions</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-4">
              <Link to="/service2" className="service-link">
                <div className="card">
                  <img src={serviceImage2} className="card-img-top" alt="Service 2" />
                  <div className="card-body">
                    <h5 className="card-title">Seminars and Conferences</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-4">
              <Link to="/service3" className="service-link">
                <div className="card">
                  <img src={serviceImage3} className="card-img-top" alt="Service 3" />
                  <div className="card-body">
                    <h5 className="card-title">Birthdays and Celebrations</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <h1 className="small-heading">Venues</h1>
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card product-card">
                <img
                  src={product.productImageUrl}
                  className="card-img-top product-img"
                  alt={product.productName}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text">Rs.{product.productPrice}</p>
                  <Link to={`/product/${product._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="about-section">
          <div className="row">
            <div className="col-md-6">
              <img src={aboutImage} className="about-img" alt="About Us" />
            </div>
            <div className="col-md-6">
              <h2>About Us</h2>
              <p>
                Welcome to VenuVue! We specialize in connecting you with the best
                vendors for your events, be it weddings, seminars, or birthday
                celebrations. Our goal is to make your event planning seamless and
                enjoyable. Browse through our wide range of services and find the
                perfect fit for your next event.
              </p>
              
            </div>
          </div>
        </div>
        </div>
        <FAQPage />
        <br></br>
      <Footer/>
    </div>
  );
};

export default HomePage;
