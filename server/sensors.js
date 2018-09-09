const { updateBookingStatus } = require('./booking');

const Gpio = process.env.NODE_ENV === 'development' ? 
  function Gpio() {
    this.read = (cb) => cb(null, 1);
    this.unexport = () => {};
  } : require('onoff').Gpio;

// Set GPIO number
const motionSensor = new Gpio(6, 'in', 'both');
const lightSensor = new Gpio(1, 'in', 'both');

process.on('SIGINT', () => {
  lightSensor.unexport();
  motionSensor.unexport();
  process.exit();
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

const init = (io) => {
  return setInterval( async () => {
    const lightSensorStatusUpdated = await updateSensorStatus(lightSensor, status.lightSensor, 0);
    const motionSensorStatusUpdated = await updateSensorStatus(motionSensor, status.motionSensor, 1);
    if (lightSensorStatusUpdated || motionSensorStatusUpdated) {
      io.sockets.emit('status', status);
      updateBookingStatus(getSensorsStatus(), io);
    }
  }, 3000);
};

const updateSensorStatus = (sensor, statusObj, onStatus) => {
  return new Promise (resolve => {
    sensor.read((err, value) => {
      let updated = false;
      const eq = value === onStatus;
      if (statusObj.value !== value) {
        updated = true;
      }
      statusObj.value   = value;
      statusObj.timeOn  = 0 + ((+ eq) * (statusObj.timeOn  + 3));
      statusObj.timeOff = 0 + ((+!eq) * (statusObj.timeOff + 3));
      resolve(updated);
    });
  })
};

const getSensorsStatus = () => {
  return Object.assign({}, status);
};

module.exports = {
  init: init,
  updateSensorStatus: updateSensorStatus,
  getSensorsStatus: getSensorsStatus
};