const bookingStatus = {
  name: '',
  becomeAvaibleSinceBooked: true
};

const setBooking = (name, sensorStatus) => {
  if(bookingStatus.name === '') {
    bookingStatus.name = name;
    bookingStatus.becomeAvaibleSinceBooked = sensorStatus.lightSensor.value ? true : false;
  }
};

const getBooking = (sensorStatus) => {
  updateBookingStatus(sensorStatus);
  return bookingStatus.name;
};

const updateBookingStatus = (sensorStatus) => {
  if(sensorStatus.lightSensor.value === 0 && bookingStatus.becomeAvaibleSinceBooked) {
    bookingStatus.name = '';
  } else if(sensorStatus.lightSensor.value !== 0 && !bookingStatus.becomeAvaibleSinceBooked) {
    bookingStatus.becomeAvaibleSinceBooked = true;
  }
};

module.exports = {
  setBooking: setBooking,
  getBooking: getBooking,
  updateBookingStatus: updateBookingStatus
};