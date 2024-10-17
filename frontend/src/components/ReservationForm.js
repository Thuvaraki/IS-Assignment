import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../ReservationForm.css';

const ReservationForm = () => {
  const { user, isAuthenticated } = useAuth0();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    vehicle_no: '',
    mileage: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const response = await fetch('http://localhost:5000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.email,
          ...formData,
        }),
      });
      if (response.ok) {
     
        setFormData({
          date: '',
          time: '',
          location: '',
          vehicle_no: '',
          mileage: '',
          message: '',
        });
      } else {
        
        console.error('Failed to create reservation');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reservation Form</h2>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <select name="time" value={formData.time} onChange={handleChange} required>
        <option value="">Select Time</option>
        <option value="10 AM">10 AM</option>
        <option value="11 AM">11 AM</option>
        <option value="12 PM">12 PM</option>
      </select>
      <input
        type="text"
        name="location"
        placeholder="Preferred Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="vehicle_no"
        placeholder="Vehicle Registration Number"
        value={formData.vehicle_no}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="mileage"
        placeholder="Current Mileage"
        value={formData.mileage}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
      />
      <button type="submit">Reserve</button>
    </form>
  );
};

export default ReservationForm;
