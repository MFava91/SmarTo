const express = require('express');
const morgan = require('morgan');
const sensors = require('./server/sensors');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.get('/status', (req, res) => {
  res.status(200).json(sensors.getSensorsStatus);
});

app.listen(80);
console.log('App listening on port 80');
