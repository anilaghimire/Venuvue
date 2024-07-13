import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import '../style/MyBookings.css';  
import Navbar from '../components/Navbar'; 
import seminarImage from '../images/seminar.jpeg';


const apiUrl = process.env.REACT_APP_API_URL;

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  }, []);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  return (
    <div className="container-fluid my-bookings-page">
      <div className="static-header">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="hero-image">
          <img src={seminarImage} alt="Hero" className="img-fluid" />
          <div className="hero-text">
            <h1>My Bookings</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Banquet</th>
                <th>Event Type</th>
                <th>Number of People</th>
                <th>Event Date</th>
                
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={booking.image}
                      alt={booking.banquet}
                      className="img-fluid booking-image"
                    />
                    {booking.banquet}
                  </td>
                  <td>{booking.eventType}</td>
                  <td>{booking.numberOfPeople}</td>
                  <td>{booking.eventDate}</td>
                  <td>{booking.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
