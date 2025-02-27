export interface IDateValue {
  date: Date;
  value: number;
}

export class DateValue implements IDateValue {
  constructor() {
    this.date = new Date();
    this.value = 0;
  }

  constructor(date: Date, value: number) {
    this.date = date;
    this.value = value;
  }
}
