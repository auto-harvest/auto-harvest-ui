import { ValueType } from "../constants/enums/ValueType.enum";
import { SensorMetadata } from "./SensorMetadata";

export interface SensorLog extends BaseEntity {
  metadata: SensorMetadata;
  data: Record<ValueType, number>;
}

export class SensorLog implements SensorLog {
  constructor() {
    this.id = "";
    this.metadata = new SensorMetadata();
    this.data = {};
  }

  constructor(
    public id: string,
    public metadata: SensorMetadata,
    public data: Record<ValueType, number>
  ) {
    this.id = id;
    this.metadata = metadata;
    this.data = data;
  }
}
