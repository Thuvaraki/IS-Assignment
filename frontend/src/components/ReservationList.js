import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { format, parseISO } from 'date-fns';
import '../ReservationList.css';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchReservations = async () => {
      if (!isAuthenticated) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const token = await getAccessTokenSilently();

        const response = await fetch(`http://localhost:5000/reservations?username=${encodeURIComponent(user.email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError('Failed to load reservations');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [isAuthenticated, getAccessTokenSilently, user.email]);

  if (loading) return <p className="loading">Loading reservations...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <h2>Your Reservations</h2>
      {reservations.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Vehicle No</th>
              <th>Mileage</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
             
              const formattedDate = format(parseISO(reservation.date), 'MMM dd, yyyy');

              return (
                <tr key={reservation.booking_id}>
                  <td>{formattedDate}</td>
                  <td>{reservation.time}</td>
                  <td>{reservation.location}</td>
                  <td>{reservation.vehicle_no}</td>
                  <td>{reservation.mileage}</td>
                  <td>{reservation.message}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <center>No reservations found.</center>
      )}
    </div>
  );
};

export default ReservationList;
