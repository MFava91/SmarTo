import { Sensor } from './sensor';

export class Status {
  lightSensor: Sensor;
  motionSensor: Sensor;

  constructor(lightSensor: Sensor, motionSensor: Sensor) {
      this.lightSensor = lightSensor;
      this.motionSensor = motionSensor;
  }
}
