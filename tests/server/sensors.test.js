/* eslint-disable no-unused-expressions*/
const oldEnv = process.env.NODE_ENV;
process.env.NODE_ENV = 'development';

const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');

const sensors = require('../../server/sensors');

const sensorMock = {
  read: (cb) => cb(null, 0),
  unexport: () => {}
};

describe('init', () => {

  it('should correctly return an interval with 3 seconds gap', done => {
    const interval = sensors.init();
    try {
      expect(interval._idleTimeout).to.equal(3000);
      clearInterval(interval);
      done();
    } catch(err) {
      done(err);
    }
  });
});

describe('updateSensorStatus', () => {
  let statusObjMock;

  beforeEach( done => {
    statusObjMock = {
      value: 'this value will be set',
      timeOn: 0,
      timeOff: 0
    };
    done();
  });

  it('should correctly update the sensor value with the sensor read value (0)', done => {
    sensors.updateSensorStatus(sensorMock, statusObjMock, 0);
    try {
      expect(statusObjMock.value).to.equal(0);
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should correctly increase the timeOn timer when the onStatus is equal to the sensor read value (0)', done =>{
    sensors.updateSensorStatus(sensorMock, statusObjMock, 0);
    try {
      expect(statusObjMock.timeOn).to.equal(3);
      expect(statusObjMock.timeOff).to.equal(0);
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should correctly increase the timeOff timer when the onStatus is different from the sensor read value (0)', done =>{
    sensors.updateSensorStatus(sensorMock, statusObjMock, 1);
    try {
      expect(statusObjMock.timeOn).to.equal(0);
      expect(statusObjMock.timeOff).to.equal(3);
      done();
    } catch(err) {
      done(err);
    }
  });
});

describe('getSensorsStatus', () => {

  it('should correctly return the module status object', done => {
    const status = sensors.getSensorsStatus();
    try {
      expect(status.lightSensor).to.exist;
      expect(status.lightSensor.value).to.exist;
      expect(status.lightSensor.timeOn).to.exist;
      expect(status.lightSensor.timeOff).to.exist;
      expect(status.motionSensor).to.exist;
      expect(status.motionSensor.value).to.exist;
      expect(status.motionSensor.timeOn).to.exist;
      expect(status.motionSensor.timeOff).to.exist;
      done();
    } catch(err) {
      done(err);
    }
  });
});

process.env.NODE_ENV = oldEnv;