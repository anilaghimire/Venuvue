import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/MyBookings.css';
import Navbar from '../components/Navbar';
import staticImage from '../images/myboooking.png'; // Your static image
import { getBookingAPI, deleteBookingAPI } from '../apis/api'; // Import deleteBookingAPI

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

  const handleDeleteBooking = async (id) => {
    try {
      await deleteBookingAPI(id);
      // Filter out the deleted booking from the state
      setBookings(bookings.filter(booking => booking._id !== id));
      console.log('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

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
                  <th>Action</th> {/* Added Action column for delete button */}
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
                        {booking.banquetName} {/* Dynamic banquet name */}
                      </td>
                      <td>{booking.eventType}</td>
                      <td>{booking.peopleNumber}</td>
                      <td>{booking.date}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteBooking(booking._id)}
                        >
                          Delete
                        </button>
                      </td>
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
