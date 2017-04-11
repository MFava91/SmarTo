var express = require('express');
var app = express();
var morgan = require('morgan'); 
var Gpio = require('onoff').Gpio;

var motionSensor = new Gpio(6, 'in', 'both');
var lightSensor = new Gpio(1,'in', 'both');

var sensor = {
    lightSensor: 0,
    timeLightSensorIsOn: 0,
    motionSensor: 0,
    timeMotionSensorIsOff: 0
}


function getLightSensorStatus() {
    lightSensor.read(function (err, value) {
        sensor['lightSensor'] = value;
        if(value == 0) {
            sensor['timeLightSensorIsOn'] += 3;
        } else {
            sensor['timeLightSensorIsOn'] = 0;
        }
        motionSensor.read(function (err, value) {
            sensor['motionSensor'] = value;
            if(value == 0) {
                sensor['timeMotionSensorIsOff'] += 3;
            } else {
                sensor['timeMotionSensorIsOff'] = 0;
            }
        });
    });
}

setInterval(getLightSensorStatus, 3000);

app.use(express.static(__dirname + '/public'));  
app.use(morgan('dev'));

app.get('/status', function (req, res) {
    res.send(sensor);
})

process.on('SIGINT', function () {
    motionSensor.unexport();
});

app.listen(80);
console.log("App listening on port 80");
