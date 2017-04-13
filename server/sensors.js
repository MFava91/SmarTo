const Gpio = require('onoff').Gpio;

// Set GPIO number
const motionSensor = new Gpio(6, 'in', 'both');
const lightSensor = new Gpio(1, 'in', 'both');

process.on('SIGINT', () => {
  lightSensor.unexport();
  motionSensor.unexport();
});

const defaultStatus = {
  value: 0,
  timeOn: 0,
  timeOff: 0
};

const status = {
  lightSensor: Object.assing({}, defaultStatus),
  motionSensor: Object.assing({}, defaultStatus)
};

setInterval(() => {
  updateSensorStatus(lightSensor, 'lightSensor', 0);
  updateSensorStatus(motionSensor, 'motionSensor', 1);
}, 3000);

const updateSensorStatus = (sensor, sensorName, onStatus) => {
  sensor.read((err, value) => {
    status[sensorName].value = value;
    if (value === onStatus) {
      sensor[sensorName].timeOn += 3;
      sensor[sensorName].timeOff = 0;
    } else {
      status[sensorName].timeOn = 0; 
      status[sensorName].timeOff += 3; 
    }
  });
};

const getSensorsStatus = () => {
  return Object.assign({}, status);
};

module.exports = {
  updateSensorStatus: updateSensorStatus,
  getSensorsStatus: getSensorsStatus
};