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

    function MainCtrl($interval, MainService, hotkeys) {
        var mainCtrl = this;
        mainCtrl.nameOfTheBooking = '';
        mainCtrl.nameChosenForBooking = '';


        hotkeys.add({
            combo: 'enter',
            allowIn: ['INPUT'],
            callback: function(event, hotkey) {
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

        function init() {
            
            mainCtrl.getStatus();
            mainCtrl.getBooking();
            mainCtrl.setLightTimer();
            mainCtrl.setMotionTimer();
            
            $interval(function() {
                mainCtrl.getStatus();
                mainCtrl.getBooking();
            }, 3000);
        }

        function getStatus() {
            MainService.getStatus().then(function (status) {
                mainCtrl.status = status;
                
                if(mainCtrl.status.lightSensor.value === 0) {
                    $('#light_icon').css('fill', '#FFD166');
                    if(!mainCtrl.lightTimer.timerStarted) {
                        mainCtrl.lightTimer.timerStarted = true;
                        mainCtrl.lightTimer.time = angular.copy(status.lightSensor.timeOn);
                    }

                } else {
                    $('#light_icon').css('fill', '#363732');
                    mainCtrl.lightTimer.timerStarted = false;
                    mainCtrl.lightTimer.time = 0;
                }
                
                if(mainCtrl.status.motionSensor.value === 1) {
                    $('#motion_icon').css('fill', '#EF476F');
                    mainCtrl.motionTimer.timerStarted = false;
                    mainCtrl.motionTimer.time = 0;
                } else {
                    $('#motion_icon').css('fill', '#363732');
                    if(!mainCtrl.motionTimer.timerStarted) {
                        mainCtrl.motionTimer.timerStarted = true;
                        mainCtrl.motionTimer.time = angular.copy(status.motionSensor.timeOff);
                    }
                }
            });
        }

        function setLightTimer() {

             $interval(function() {

                 if(mainCtrl.lightTimer.timerStarted) {

                    mainCtrl.lightTimer.hours = Math.floor(mainCtrl.lightTimer.time / 3600);
                    mainCtrl.lightTimer.minutes = Math.floor((mainCtrl.lightTimer.time % 3600) / 60);
                    mainCtrl.lightTimer.seconds = Math.floor((mainCtrl.lightTimer.time % 3600) % 60);
                    mainCtrl.lightTimer.time++;
                }
            }, 1000);
        }

        function setMotionTimer() {

             $interval(function() {

                 if(mainCtrl.motionTimer.timerStarted) {

                    mainCtrl.motionTimer.hours = Math.floor(mainCtrl.motionTimer.time / 3600);
                    mainCtrl.motionTimer.minutes = Math.floor((mainCtrl.motionTimer.time % 3600) / 60);
                    mainCtrl.motionTimer.seconds = Math.floor((mainCtrl.motionTimer.time % 3600) % 60);
                    mainCtrl.motionTimer.time++;
                }
            }, 1000);
        }

        function getBooking() {

            MainService.getBooking().then(function (bookingStatus){
                if(bookingStatus != mainCtrl.nameOfTheBooking) {
                    mainCtrl.nameOfTheBooking = bookingStatus;
                }
            })
        }

        function setBooking() {
            
            if(mainCtrl.nameOfTheBooking == '') {
                MainService.setBooking(mainCtrl.nameChosenForBooking).then(function (){
                    mainCtrl.nameOfTheBooking = mainCtrl.nameChosenForBooking;
                    mainCtrl.nameChosenForBooking = '';
                })
            }
            
        }

        mainCtrl.init();
    }
})();