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
  lightSensor: Object.assign({}, defaultStatus),
  motionSensor: Object.assign({}, defaultStatus)
};

setInterval(() => {
  updateSensorStatus(lightSensor, 'lightSensor', 0);
  updateSensorStatus(motionSensor, 'motionSensor', 1);
}, 3000);

const updateSensorStatus = (sensor, sensorName, onStatus) => {
  sensor.read((err, value) => {
    const eq = value === onStatus;
    status[sensorName].value   = value;
    status[sensorName].timeOn  = 0 + ((+ eq) * (status[sensorName].timeOn  + 3));
    status[sensorName].timeOff = 0 + ((+!eq) * (status[sensorName].timeOff + 3));
  });
};

const getSensorsStatus = () => {
  return Object.assign({}, status);
};

module.exports = {
  updateSensorStatus: updateSensorStatus,
  getSensorsStatus: getSensorsStatus
};