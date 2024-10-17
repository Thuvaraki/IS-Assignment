const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const reservationRoutes = require('./routes/reservations');


app.use('/reservations', reservationRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



