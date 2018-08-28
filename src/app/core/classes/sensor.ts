export class Sensor {
  value: number;
  timeOn: number;
  timeOff: number;

  constructor(value: number, timeOn: number, timeOff: number) {
    this.value = value;
    this.timeOn = timeOn;
    this.timeOff = timeOff;
  }
}
