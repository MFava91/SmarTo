(function () {
  'use strict';

  /**
    * @ngdoc controller
    * @name MainCtrl
    * @description
    */

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($interval, MainService, hotkeys, webNotification, ngNotify) {
    var mainCtrl = this;
    mainCtrl.nameOfTheBooking = '';
    mainCtrl.nameChosenForBooking = '';


    hotkeys.add({
      combo: 'enter',
      allowIn: ['INPUT'],
      callback: function (event, hotkey) {
        mainCtrl.setBooking();
      }
    });

    //---- function ---------
    mainCtrl.init = init;
    mainCtrl.getStatus = getStatus;
    mainCtrl.setLightTimer = setLightTimer;
    mainCtrl.setMotionTimer = setMotionTimer;
    mainCtrl.getBooking = getBooking;
    mainCtrl.setBooking = setBooking;
    mainCtrl.enablesAvailabilityNotification = enablesAvailabilityNotification;
    mainCtrl.stopAvailabilityNotification = stopAvailabilityNotification;
    mainCtrl.notifyAvailability = notifyAvailability;
    mainCtrl.statusValue = 0;

    //---- variable ---------
    mainCtrl.status = {
      lightSensor: {
        value: 0,
        timeOn: 0,
        timeOff: 0
      },
      motionSensor: {
        value: 0,
        timeOn: 0,
        timeOff: 0
      }
    };

    mainCtrl.lightTimer = {
      timerStarted: false,
      time: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    mainCtrl.motionTimer = {
      timerStarted: false,
      time: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    mainCtrl.availabilityNotificationEnabled = false;
    mainCtrl.availabilityNotificationInterval;

    function init() {

      mainCtrl.getStatus();
      mainCtrl.getBooking();
      mainCtrl.setLightTimer();
      mainCtrl.setMotionTimer();

      $interval(function () {
        mainCtrl.getStatus();
        mainCtrl.getBooking();
      }, 3000);
    }

    function getStatus() {
      MainService.getStatus().then(function (status) {
        mainCtrl.status = status;

        if (mainCtrl.status.lightSensor.value === 0) {
          $('#light_icon').css('fill', '#FFD166');
          if (!mainCtrl.lightTimer.timerStarted) {
            mainCtrl.lightTimer.timerStarted = true;
            mainCtrl.lightTimer.time = angular.copy(status.lightSensor.timeOn);
          }
        } else {
          $('#light_icon').css('fill', '#0d160b');
          mainCtrl.lightTimer.timerStarted = false;
          mainCtrl.lightTimer.time = 0;
        }

        if (mainCtrl.status.motionSensor.value === 1) {
          $('#motion_icon').css('fill', '#EF476F');
          mainCtrl.motionTimer.timerStarted = false;
          mainCtrl.motionTimer.time = 0;
        } else {
          $('#motion_icon').css('fill', '#0d160b');
          if (!mainCtrl.motionTimer.timerStarted) {
            mainCtrl.motionTimer.timerStarted = true;
            mainCtrl.motionTimer.time = angular.copy(status.motionSensor.timeOff);
          }
        }
      });
    }

    function setLightTimer() {

      $interval(function () {

        if (mainCtrl.lightTimer.timerStarted) {

          mainCtrl.lightTimer.hours = Math.floor(mainCtrl.lightTimer.time / 3600);
          mainCtrl.lightTimer.minutes = Math.floor((mainCtrl.lightTimer.time % 3600) / 60);
          mainCtrl.lightTimer.seconds = Math.floor((mainCtrl.lightTimer.time % 3600) % 60);
          mainCtrl.lightTimer.time++;
        }
      }, 1000);
    }

    function setMotionTimer() {

      $interval(function () {

        if (mainCtrl.motionTimer.timerStarted) {

          mainCtrl.motionTimer.hours = Math.floor(mainCtrl.motionTimer.time / 3600);
          mainCtrl.motionTimer.minutes = Math.floor((mainCtrl.motionTimer.time % 3600) / 60);
          mainCtrl.motionTimer.seconds = Math.floor((mainCtrl.motionTimer.time % 3600) % 60);
          mainCtrl.motionTimer.time++;
        }
      }, 1000);
    }

    function getBooking() {

      MainService.getBooking().then(function (bookingStatus) {
        if (bookingStatus != mainCtrl.nameOfTheBooking) {
          mainCtrl.nameOfTheBooking = bookingStatus;
        }
      })
    }

    function setBooking() {

      if (mainCtrl.nameOfTheBooking == '' && mainCtrl.nameChosenForBooking != '') {
        MainService.setBooking(mainCtrl.nameChosenForBooking).then(function () {
          ngNotify.set('Your reservation has been successful. You will be notified when the toilet is available.');
          mainCtrl.nameOfTheBooking = mainCtrl.nameChosenForBooking;
          mainCtrl.nameChosenForBooking = '';
          mainCtrl.enablesAvailabilityNotification(mainCtrl.nameOfTheBooking + ', it\'s your turn! The toilet is available!')
        })
      }
    }

    function enablesAvailabilityNotification(message, notifyMessage) {

      if (notifyMessage) {
        ngNotify.set(notifyMessage);
      }

      if (!mainCtrl.availabilityNotificationEnabled) {

        mainCtrl.availabilityNotificationEnabled = true;

        mainCtrl.availabilityNotificationInterval = $interval(function () {
          if (mainCtrl.status.lightSensor.value > 0) {
            mainCtrl.notifyAvailability(message);
            mainCtrl.stopAvailabilityNotification();
          }
        }, 1000);
      }
    }

    function stopAvailabilityNotification() {
      $interval.cancel(mainCtrl.availabilityNotificationInterval);
    }

    function notifyAvailability(message) {
      webNotification.showNotification('SmarTo', {
        body: message,
        icon: '../../img/favicon/favicon.ico',
        autoClose: 4000 //auto close the notification after 4 seconds (you can manually close it via hide function)
      }, function onShow(error, hide) {
        if (error) {
          window.alert('Unable to show notification: ' + error.message);
        } else {
          mainCtrl.availabilityNotificationEnabled = false;
          setTimeout(function hideNotification() {
            hide(); //manually close the notification (you can skip this if you use the autoClose option)
          }, 5000);
        }
      });
    }

    mainCtrl.init();
  }
})();