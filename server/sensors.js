const Gpio = process.env.NODE_ENV === 'development' ? 
  function Gpio() {
    this.read = (cb) => cb(null, 0);
    this.unexport = () => {};
  } :
  require('onoff').Gpio;

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

const init = () => {
  return setInterval(() => {
    updateSensorStatus(lightSensor, status.lightSensor, 0);
    updateSensorStatus(motionSensor, status.motionSensor, 1);
  }, 3000);
};

const updateSensorStatus = (sensor, statusObj, onStatus) => {
  sensor.read((err, value) => {
    const eq = value === onStatus;
    statusObj.value   = value;
    statusObj.timeOn  = 0 + ((+ eq) * (statusObj.timeOn  + 3));
    statusObj.timeOff = 0 + ((+!eq) * (statusObj.timeOff + 3));
  });
};

const getSensorsStatus = () => {
  return Object.assign({}, status);
};

module.exports = {
  init: init,
  updateSensorStatus: updateSensorStatus,
  getSensorsStatus: getSensorsStatus
};