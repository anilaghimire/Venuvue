import React, { useState } from 'react';
import Footer from '../components/footer';
import '../style/Booking.css';
import { createBookingAPI } from '../apis/api';

const Booking = () => {
  const [eventType, setEventType] = useState('');
  const [peopleNumber, setPeopleNumber] = useState('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (peopleNumber < 15) {
      newErrors.peopleNumber = 'Number of people must be at least 15.';
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for comparison
    today.setHours(0, 0, 0, 0); // Reset time part for comparison
    if (selectedDate < today) {
      newErrors.date = 'Event date cannot be in the past.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    try {
      // Retrieve user ID from local storage
      const userDataFromStorage = localStorage.getItem("user");
      if (!userDataFromStorage) {
        console.error('User data not found in local storage');
        return;
      }
      const { _id: userId } = JSON.parse(userDataFromStorage);

      // Prepare booking data
      const data = { userId, eventType, peopleNumber, date };

      // Call API to create booking
      await createBookingAPI(data);
      
      // Redirect or display success message
      alert('Booking created successfully!');
      // Optionally, redirect to mybookings page
      // window.location.href = '/mybookings';
    } catch (error) {
      console.error('Error creating booking', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handlePeopleNumberChange = (e) => {
    setPeopleNumber(e.target.value);
    if (e.target.value >= 15) {
      setErrors((prevErrors) => ({ ...prevErrors, peopleNumber: '' }));
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate >= today) {
      setErrors((prevErrors) => ({ ...prevErrors, date: '' }));
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
            {errors.peopleNumber && <div className="error">{errors.peopleNumber}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="date">Event date</label>
            <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            {errors.date && <div className="error">{errors.date}</div>}
          </div>
          <button type="submit" className="submit-button">Submit now</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
