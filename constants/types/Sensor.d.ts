import { SensorType } from "../enums/SensorType.enum";

export interface Sensor extends BaseEntity {
  name: string;
  type: SensorType;
  description: string;
  code: string;
}

export class Sensor implements Sensor {
  constructor() {
    this.id = "";
    this.name = "";
    this.type = SensorType.Temperature;
    this.description = "";
    this.code = "";
  }

  constructor(
    public id: string,
    public name: string,
    public type: SensorType,
    public description: string,
    public code: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.code = code;
  }
}
