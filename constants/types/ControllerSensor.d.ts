import { Controller } from "./Controller";
import { Sensor } from "./Sensor";

export interface ControllerSensor {
  controller: Controller;
  sensor: Sensor;
  code: string;
}

export class ControllerSensor implements ControllerSensor {
  constructor() {
    this.controller = new Controller();
    this.sensor = new Sensor();
    this.code = "";
  }

  constructor(
    public controller: Controller,
    public sensor: Sensor,
    public code: string
  ) {
    this.controller = controller;
    this.sensor = sensor;
    this.code = code;
  }
}
