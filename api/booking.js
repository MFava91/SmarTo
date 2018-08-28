const bookingStatus = {
  name: '', 
  isBooked: false,
  becomeAvaibleSinceBooked: true
};

const setBooking = (name, sensorStatus) => {
  if (!bookingStatus.isBooked) {
    bookingStatus.name = name;
    bookingStatus.isBooked = true;
    bookingStatus.becomeAvaibleSinceBooked = sensorStatus.lightSensor.value === 1;
  }
};

const getBookingName = (sensorStatus) => {
  updateBookingStatus(sensorStatus);
  return bookingStatus.name;
};

const updateBookingStatus = (sensorStatus) => {
  if (sensorStatus.lightSensor.value === 0 && bookingStatus.becomeAvaibleSinceBooked) {
    bookingStatus.name = '';
    bookingStatus.isBooked = false;
  } else if (sensorStatus.lightSensor.value !== 0 && !bookingStatus.becomeAvaibleSinceBooked) {
    bookingStatus.becomeAvaibleSinceBooked = true;
  }
};

module.exports = {
  setBooking: setBooking,
  getBookingName: getBookingName,
  updateBookingStatus: updateBookingStatus,
  _bookingStatus: bookingStatus
};