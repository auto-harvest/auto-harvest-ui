import { ValueType } from "../enums/ValueType.enum";
import { AggregateSensorMetadata } from "./AggregateSensorMetadata";

export interface HistoricSensorLog extends BaseEntity {
  metadata: AggregateSensorMetadata;
  data: Record<ValueType, number>;
}

export class HistoricSensorLog implements HistoricSensorLog {
  constructor() {
    this.id = "";
    this.metadata = new AggregateSensorMetadata();
    this.data = {};
  }

  constructor(
    public id: string,
    public metadata: AggregateSensorMetadata,
    public data: Record<ValueType, number>
  ) {
    this.id = id;
    this.metadata = metadata;
    this.data = data;
  }
}
