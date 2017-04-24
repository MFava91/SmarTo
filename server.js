const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sensors = require('./server/sensors');
const booking = require('./server/booking');

sensors.init();

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/status', (req, res) => {
  res.status(200).json(sensors.getSensorsStatus());
});

app.get('/booking', function (req, res) {
  res.status(200).send(booking.getBooking(sensors.getSensorsStatus()));
});

app.post('/booking', function (req, res) {
  booking.setBooking(req.body.name, sensors.getSensorsStatus());
  res.status(201).send(); 
});

app.listen(80);
console.log('App listening on port 80');
