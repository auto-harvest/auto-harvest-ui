import { Granularity } from "../enums/Granularity.enum";
import { Statistics } from "./Statistics";

interface IAggregateSensorMetadata {
  granularity: Granularity;
  statics?: Statistics | undefined | null;
}

export class AggregateSensorMetadata implements IAggregateSensorMetadata {
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
