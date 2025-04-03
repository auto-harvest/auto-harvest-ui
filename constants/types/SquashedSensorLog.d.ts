import { BaseEntity } from "./_BaseEntity";

export interface IHistoricSensorData extends BaseEntity {
  type: string;
  interval: string;
  timestamp: Date;
  averageValue: number;
  controller: string;
  variance: number;
  median: number;
  average: number;
  datapoints: number;
  min: { date: Date; value: number };
  max: { date: Date; value: number };
  createdAt: Date;
  updatedAt: Date;
}

export class HistoricSensorData implements IHistoricSensorData {
  constructor() {
    this.id = "";
    this.type = "";
    this.interval = "";
    this.timestamp = new Date();
    this.averageValue = 0;
    this.controller = "";
    this.variance = 0;
    this.median = 0;
    this.average = 0;
    this.datapoints = 0;
    this.min = { date: new Date(), value: 0 };
    this.max = { date: new Date(), value: 0 };
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  constructor(
    public id: string,
    public type: string,
    public interval: string,
    public timestamp: Date,
    public averageValue: number,
    public controller: string,
    public variance: number,
    public median: number,
    public average: number,
    public datapoints: number,
    public min: { date: Date; value: number },
    public max: { date: Date; value: number },
    public createdAt: Date,
    public updatedAt: Date
  ) {
    this.id = id;
    this.type = type;
    this.interval = interval;
    this.timestamp = timestamp;
    this.averageValue = averageValue;
    this.controller = controller;
    this.variance = variance;
    this.median = median;
    this.average = average;
    this.datapoints = datapoints;
    this.min = min;
    this.max = max;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
