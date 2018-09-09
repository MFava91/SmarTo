const express = require('express');
const http = require('http').Server(express);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const io = require('socket.io')(3333);
const path = require('path');
const sensors = require('./sensors');
const { getBookingName, setBooking } = require('./booking');

sensors.init(io);

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
  setBooking(req.body.name, sensors.getSensorsStatus(), io);
  res.status(204).end(); 
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/SmarTo/index.html'));
});

io.on('connection', (socket) => {
  io.sockets.emit('status', sensors.getSensorsStatus())
  io.sockets.emit('booking', getBookingName(sensors.getSensorsStatus()));
});


app.listen(3000, () => console.log('App listening on port 3000'));