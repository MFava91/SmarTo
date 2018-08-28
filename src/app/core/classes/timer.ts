export class Timer {
  timerStarted: boolean;
  time: number;
  hours: number;
  minutes: number;
  seconds: number;

  constructor(timeStarted: boolean, time: number, hours: number, minutes: number, seconds: number) {
    this.timerStarted = timeStarted;
    this.time = time;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }
}
