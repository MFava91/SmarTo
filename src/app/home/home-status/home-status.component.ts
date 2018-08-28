import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../core/services/home.service';

import { Status } from '../../core/classes/status';
import { Timer } from '../../core/classes/timer';
import { Sensor } from '../../core/classes/sensor';

@Component({
  selector: 'app-home-status',
  templateUrl: './home-status.component.html',
  styleUrls: ['./home-status.component.scss']
})
export class HomeStatusComponent implements OnInit {

  public status: Status;
  public lightTimer: Timer;
  public motionTimer: Timer;

  private motionSensor: Sensor;
  private lightSensor: Sensor;

  constructor(
    private homeService: HomeService
  ) {
    this.motionSensor = new Sensor(0, 0, 0);
    this.lightSensor = new Sensor(0, 0, 0);
    this.status = new Status(this.motionSensor, this.lightSensor);
    this.lightTimer = new Timer(false, 0, 0, 0, 0);
    this.motionTimer = new Timer(false, 0, 0, 0, 0);
  }

  getStatus(): void {
    this.homeService.getStatus().subscribe(
      status => {
        this.status = status;
        this.homeService.statusChange(status.lightSensor.value);
        if (status.lightSensor.value === 0) {
          // document.getElementById('#light_icon').style.fill = '#FFD166';
          if (!this.lightTimer.timerStarted) {
            this.lightTimer.timerStarted = true;
            this.lightTimer.time = status.lightSensor.timeOn;
          }

        } else {
          // $('#light_icon').css('fill', '#363732');
          this.lightTimer.timerStarted = false;
          this.lightTimer.time = 0;
        }

        if (status.motionSensor.value === 1) {
          // $('#motion_icon').css('fill', '#EF476F');
          this.motionTimer.timerStarted = false;
          this.motionTimer.time = 0;
        } else {
          // $('#motion_icon').css('fill', '#363732');
          if (!this.motionTimer.timerStarted) {
            this.motionTimer.timerStarted = true;
            this.motionTimer.time = status.motionSensor.timeOff;
          }
        }
      }
    );
  }

  setTimer(timer): void {
    setInterval(function () {
      if (timer.timerStarted) {

        timer.hours = Math.floor(timer.time / 3600);
        timer.minutes = Math.floor((timer.time % 3600) / 60);
        timer.seconds = Math.floor((timer.time % 3600) % 60);
        timer.time++;
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.getStatus();
    this.setTimer(this.lightTimer);
    this.setTimer(this.motionTimer);

    setInterval(() => {
      this.getStatus();
      // this.getBooking();
    }, 3000);
  }

}
