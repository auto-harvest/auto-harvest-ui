export interface DateValue {
  date: Date;
  value: number;
}

export class DateValue implements DateValue {
  constructor() {
    this.date = new Date();
    this.value = 0;
  }

  constructor(date: Date, value: number) {
    this.date = date;
    this.value = value;
  }
}
