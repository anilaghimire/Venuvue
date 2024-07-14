import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import '../style/MyBookings.css';  
import Navbar from '../components/Navbar'; 
import image from '../images/saved.png'; 
import { getBookingAPI } from '../apis/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate(); // Use navigate to redirect if user is not found

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userDataFromStorage = localStorage.getItem("user");
        if (userDataFromStorage) {
          const { _id: userId } = JSON.parse(userDataFromStorage);

          // Call getBookingAPI with userId
          const response = await getBookingAPI(userId);
          console.log('API Response:', response.data);  
          setBookings(response.data);
        } else {
          navigate("/login"); // Redirect to login if user data is not found in local storage
        }
      } catch (error) {
        console.error('Error fetching bookings', error);
      } finally {
        setLoading(false); // Set loading state to false once data is fetched or error occurs
      }
    };

    fetchBookings();
  }, [navigate]); // Include navigate in dependency array

  return (
    <div className="container-fluid my-bookings-page">
      <div className="static-header">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="container-fluid" style={{ backgroundColor: "#ffffff", paddingTop: "50px", paddingBottom: "50px" }}>
          {/* Static Image Section */}
          <div className="w-100 mb-4" style={{ height: "50vh", overflow: "hidden" }}>
            <img src={image} alt="Static" className="img-fluid w-100" style={{ objectFit: "cover", height: "100%" }} />
          </div>
        </div>
      </div>

      <div className="container">
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
                          src={booking.image}
                          alt={booking.banquet}
                          className="img-fluid booking-image"
                        />
                        {booking.banquet}
                      </td>
                      <td>{booking.eventType}</td>
                      <td>{booking.peopleNumber}</td>
                      <td>{booking.date}</td>
                      
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No bookings available</td>
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
