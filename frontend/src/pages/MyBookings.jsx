import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/MyBookings.css';
import Navbar from '../components/Navbar';
import staticImage from '../images/myboooking.png'; // Your static image
import { getBookingAPI } from '../apis/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userDataFromStorage = localStorage.getItem("user");
        if (userDataFromStorage) {
          const { _id: userId } = JSON.parse(userDataFromStorage);
          const response = await getBookingAPI(userId);
          console.log('API Response:', response.data);  
          setBookings(response.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error('Error fetching bookings', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <div className="my-bookings-page">
      <Navbar />
      <div className="static-header">
        <div className="hero-section">
          <div className="hero-image-container">
            <img src={staticImage} alt="Static" className="img-fluid hero-image" />
          </div>
        </div>
      </div>

      <div className="booking-list">
        <h2 className="booking-list-title">My Bookings</h2>
        <div className="table-responsive">
          {loading ? (
            <p>Loading...</p>
          ) : (
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
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={staticImage} // Use static image
                          alt="Banquet"
                          className="img-fluid booking-image"
                        />
                        Static Banquet Name {/* Static name */}
                      </td>
                      <td>{booking.eventType}</td>
                      <td>{booking.peopleNumber}</td>
                      <td>{booking.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No bookings available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
