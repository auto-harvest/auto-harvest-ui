import { Granularity } from "../enums/Granularity.enum";
import { Statistics } from "./Statistics";

export interface AggregateSensorMetadata {
  granularity: Granularity;
  statics?: Statistics | undefined | null;
}

export class AggregateSensorMetadata implements AggregateSensorMetadata {
  constructor() {
    this.granularity = Granularity.MINUTE;
    this.statics = null;
  }

  constructor(
    granularity: Granularity,
    statics?: Statistics | undefined | null
  ) {
    this.granularity = granularity;
    this.statics = statics;
  }
}
