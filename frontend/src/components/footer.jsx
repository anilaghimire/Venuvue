import React from 'react';
import '../style/Footer.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import bookingIcon from '../images/booking.png' ;
import requirement from '../images/requirement.png' ;
import quote from '../images/quote.png';




const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Book a vendor in simple steps</h2>
        <div className="steps">
          <div className="step">
            <img src={requirement} alt="Send Requirement" />
            <h3>SEND REQUIREMENT</h3>
            <p>Send your requirements to multiple vendors</p>
          </div>
          <div className="step">
            <img src={quote} alt="Get Quote" />
            <h3>GET QUOTE</h3>
            <p>Get quotes on your phone & compare</p>
          </div>
          <div className="step">
            <img src={bookingIcon} alt="Book Now" />
            <h3>BOOK NOW</h3>
            <p>Book the best vendor for your events</p>
          </div>
        </div>
        <div className="location">
          <FaMapMarkerAlt />
          <span>Dillibazar, Kathmandu</span>
        </div>
        <div className="copyright">
          <p>© 2024 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
