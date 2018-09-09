const bookingStatus = {
  name: '', 
  isBooked: false,
  becomeAvaibleSinceBooked: true
};

const setBooking = (name, sensorStatus, io) => {
  if (!bookingStatus.isBooked) {
    bookingStatus.name = name;
    bookingStatus.isBooked = true;
    bookingStatus.becomeAvaibleSinceBooked = sensorStatus.lightSensor.value === 1;
    io.sockets.emit('booking', bookingStatus.name);
  }
};

const getBookingName = (sensorStatus) => {
  return bookingStatus.name;
};

const updateBookingStatus = (sensorStatus, io) => {
  if (sensorStatus.lightSensor.value === 0 && bookingStatus.becomeAvaibleSinceBooked) {
    bookingStatus.name = '';
    bookingStatus.isBooked = false;
    io.sockets.emit('booking',bookingStatus.name);
  } else if (sensorStatus.lightSensor.value !== 0 && !bookingStatus.becomeAvaibleSinceBooked) {
    bookingStatus.becomeAvaibleSinceBooked = true;
  }
  return bookingStatus.name;
};

module.exports = {
  setBooking: setBooking,
  getBookingName: getBookingName,
  updateBookingStatus: updateBookingStatus,
  _bookingStatus: bookingStatus
};