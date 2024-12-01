import { DateValue } from "./DateValue";

export interface Statistics {
  variance: number;
  median: number;
  datapoint: number;
  min: DateValue;
  max: DateValue;
}

export class Statistics implements Statistics {
  constructor() {
    this.variance = 0;
    this.median = 0;
    this.datapoint = 0;
    this.min = new DateValue();
    this.max = new DateValue();
  }

  constructor(
    public variance: number,
    public median: number,
    public datapoint: number,
    public min: DateValue,
    public max: DateValue
  ) {
    this.variance = variance;
    this.median = median;
    this.datapoint = datapoint;
    this.min = min;
    this.max = max;
  }
}
