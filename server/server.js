const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const sensors = require('./sensors');
const { getBookingName, setBooking } = require('./booking');

sensors.init();

const app = express();

app.use(express.static(__dirname + '/../dist/SmarTo'));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.get('/status', (req, res) => {
  res.status(200).json(sensors.getSensorsStatus());
}); 

app.get('/booking', (req, res) => {
  res.status(200).json(getBookingName(sensors.getSensorsStatus()));
});

app.put('/booking', (req, res) => {
  setBooking(req.body.name, sensors.getSensorsStatus());
  res.status(204).end(); 
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/SmarTo/index.html'));
});

const server = http.createServer(app);
server.listen(3000, () => console.log('App listening on port 80'));