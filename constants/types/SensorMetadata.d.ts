import { SensorType } from "react-native-reanimated";
import { ControllerSensor } from "./ControllerSensor";

export interface SensorMetadata {
  type: SensorType;
  timestamp: Date;
  name: string;
  controllerSensor: ControllerSensor;
}

export class SensorMetadata implements SensorMetadata {
  constructor() {
    this.type = SensorType.Temperature;
    this.timestamp = new Date();
    this.name = "";
    this.controllerSensor = new ControllerSensor();
  }

  constructor(
    public type: SensorType,
    public timestamp: Date,
    public name: string,
    public controllerSensor: ControllerSensor
  ) {
    this.type = type;
    this.timestamp = timestamp;
    this.name = name;
    this.controllerSensor = controllerSensor;
  }
}
