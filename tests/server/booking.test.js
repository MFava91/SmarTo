/* eslint-disable no-unused-expressions*/
const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');

const booking = require('../../server/booking');

describe('setBooking', () => {

  beforeEach( done => {
    const status = booking._bookingStatus;
    status.name = '';
    status.isBooked = false;
    status.becomeAvaibleSinceBooked = true;
    done();
  });

  it('should correctly update booking status when there is no booking with light off', done => {
    const status = booking._bookingStatus;
    try {
      expect(status.name).to.be.empty;
      expect(status.isBooked).to.be.false;
      expect(status.becomeAvaibleSinceBooked).to.be.true;
    
      const name = 'name';
      const sensorStatus = { 
        lightSensor: { 
          value: 1 
        } 
      };

      booking.setBooking(name, sensorStatus);

      expect(status.name).to.equal(name);
      expect(status.isBooked).to.be.true;
      expect(status.becomeAvaibleSinceBooked).to.be.true;
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should correctly update booking status when there is no booking with light on', done => {
    const status = booking._bookingStatus;
    try {
      expect(status.name).to.be.empty;
      expect(status.isBooked).to.be.false;
      expect(status.becomeAvaibleSinceBooked).to.be.true;
    
      const name = 'name';
      const sensorStatus = { 
        lightSensor: { 
          value: 0 
        } 
      };
      booking.setBooking(name, sensorStatus);

      expect(status.name).to.equal(name);
      expect(status.isBooked).to.be.true;
      expect(status.becomeAvaibleSinceBooked).to.be.false;
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should not update booking status when it is already booked', done => {
    const status = booking._bookingStatus;
    status.name = 'booked';
    status.isBooked = true;
    status.becomeAvaibleSinceBooked = true;
    try {
      const name = 'name';
      const sensorStatus = { 
        lightSensor: { 
          value: 0 
        } 
      };
      booking.setBooking(name, sensorStatus);

      expect(status.name).to.equal('booked');
      expect(status.isBooked).to.be.true;
      expect(status.becomeAvaibleSinceBooked).to.be.true;
      done();
    } catch(err) {
      done(err);
    }
  });
});

describe('updateBookingStatus', () => {
  
  beforeEach( done => {
    const status = booking._bookingStatus;
    status.name = '';
    status.isBooked = false;
    status.becomeAvaibleSinceBooked = true;
    done();
  });

  it('should correctly reset booking status if the light is on and it has became available since booked', done => {
    const status = booking._bookingStatus;
    status.name = 'name';
    status.isBooked = true;
    status.becomeAvaibleSinceBooked = true;
    const sensorStatus = {
      lightSensor: {
        value: 0
      }
    };
    booking.updateBookingStatus(sensorStatus);
    try {
      expect(status.name).to.be.empty;
      expect(status.isBooked).to.be.false;
      expect(status.becomeAvaibleSinceBooked).to.be.true;
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should correctly set that it became available since booked if the light is off and it had not became available since booked', done => {
    const status = booking._bookingStatus;
    status.name = 'name';
    status.isBooked = true;
    status.becomeAvaibleSinceBooked = false;
    const sensorStatus = {
      lightSensor: {
        value: 1
      }
    };
    booking.updateBookingStatus(sensorStatus);
    try {
      expect(status.name).to.equal('name');
      expect(status.isBooked).to.be.true;
      expect(status.becomeAvaibleSinceBooked).to.be.true;
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should do nothing if the light is on but it had not became available since booked', done => {
    const status = booking._bookingStatus;
    status.name = 'name';
    status.isBooked = true;
    status.becomeAvaibleSinceBooked = false;
    const sensorStatus = {
      lightSensor: {
        value: 0
      }
    };
    booking.updateBookingStatus(sensorStatus);
    try {
      expect(status.name).to.equal('name');
      expect(status.isBooked).to.be.true;
      expect(status.becomeAvaibleSinceBooked).to.be.false;
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should do nothing if the light is off but it had already became available since booked', done => {
    const status = booking._bookingStatus;
    status.name = 'name';
    status.isBooked = true;
    status.becomeAvaibleSinceBooked = true;
    const sensorStatus = {
      lightSensor: {
        value: 1
      }
    };
    booking.updateBookingStatus(sensorStatus);
    try {
      expect(status.name).to.equal('name');
      expect(status.isBooked).to.be.true;
      expect(status.becomeAvaibleSinceBooked).to.be.true;
      done();
    } catch(err) {
      done(err);
    }
  });
});

describe('getBookingName', () => {

  beforeEach( done => {
    const status = booking._bookingStatus;
    status.name = '';
    status.isBooked = false;
    status.becomeAvaibleSinceBooked = true;
    done();
  });

  it('should return an empty string if it is not booked', done => {
    const sensorStatus = {
      lightSensor: {
        value: 0
      }
    };
    const name = booking.getBookingName(sensorStatus);
    try {
      expect(name).to.be.empty;
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should return an empty string if it is booked but the light is on after it became avaialble', done => {
    const status = booking._bookingStatus;
    status.name = 'name';
    status.isBooked = true;
    const sensorStatus = {
      lightSensor: {
        value: 0
      }
    };
    const name = booking.getBookingName(sensorStatus);
    try {
      expect(name).to.be.empty;
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should return the booking name if it is booked and the light is off', done => {
    const status = booking._bookingStatus;
    status.name = 'name';
    status.isBooked = true;
    status.becomeAvaibleSinceBooked = false;
    const sensorStatus = {
      lightSensor: {
        value: 1
      }
    };
    const name = booking.getBookingName(sensorStatus);
    try {
      expect(name).to.equal('name');
      done();
    } catch(err) {
      done(err);
    }
  });

  it('should return the booking name if it is booked and the light is on without becoming available since booked', done => {
    const status = booking._bookingStatus;
    status.name = 'name';
    status.isBooked = true;
    status.becomeAvaibleSinceBooked = false;
    const sensorStatus = {
      lightSensor: {
        value: 0
      }
    };
    const name = booking.getBookingName(sensorStatus);
    try {
      expect(name).to.equal('name');
      done();
    } catch(err) {
      done(err);
    }
  });
});