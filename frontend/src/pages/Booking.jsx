import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import '../style/Booking.css';
import { createBookingAPI } from '../apis/api';

const Booking = () => {
  const [eventType, setEventType] = useState('');
  const [peopleNumber, setPeopleNumber] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { eventType, peopleNumber, date };
      await createBookingAPI(data);
      navigate("/mybooking");
    } catch (error) {
      console.error('Error creating booking', error);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-form-container" style={{ margin: "150px 0px 100px 0px" }}>
        <h2 className="booking-form-title">Booking Form</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="event">What event are you planning?</label>
            <input type="text" id="event" name="event" value={eventType} onChange={(e) => setEventType(e.target.value)} placeholder="Enter event type" required />
          </div>
          <div className="form-group">
            <label htmlFor="people">People</label>
            <input type="number" id="people" name="people" value={peopleNumber} onChange={(e) => setPeopleNumber(e.target.value)} placeholder="Number of people" required />
          </div>
          <div className="form-group">
            <label htmlFor="date">Event date</label>
            <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <button type="submit" className="submit-button">Submit now</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
