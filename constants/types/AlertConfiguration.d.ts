import { ValueType } from "../enums/ValueType.enum";
import { ControllerSensor } from "./ControllerSensor";

export interface IAlertConfiguration extends BaseEntity {
  name: string;
  controllerSensor: ControllerSensor;
  accessorKey: ValueType;
  min: number;
  max: number;
}

export class AlertConfiguration implements IAlertConfiguration {
  constructor() {
    this.id = "";
    this.name = "";
    this.controllerSensor = ControllerSensor.Temperature;
    this.accessorKey = ValueType.Value;
    this.min = 0;
    this.max = 0;
  }

  constructor(
    public id: string,
    public name: string,
    public controllerSensor: ControllerSensor,
    public accessorKey: ValueType,
    public min: number,
    public max: number
  ) {
    this.id = id;
    this.name = name;
    this.controllerSensor = controllerSensor;
    this.accessorKey = accessorKey;
    this.min = min;
    this.max = max;
  }
}
