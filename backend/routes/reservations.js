const express = require('express');
const router = express.Router();
const mysql = require('mysql2');


const db = require('../config/db'); 

router.post('/', (req, res) => {
  const { username, date, time, location, vehicle_no, mileage, message } = req.body;

  if (!username || !date || !time || !location || !vehicle_no || !mileage) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO reservations (username, date, time, location, vehicle_no, mileage, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [username, date, time, location, vehicle_no, mileage, message], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Reservation created', booking_id: result.insertId });
  });
});

router.get('/', (req, res) => {
  const { username } = req.query; 
  if (!username) {
    return res.status(400).json({ error: 'No user available' });
  }
  
  const query = 'SELECT * FROM reservations WHERE username = ?';
  
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    
  
    res.status(200).json(results.length > 0 ? results : []);
  });
});



module.exports = router;
