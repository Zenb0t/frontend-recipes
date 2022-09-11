import { object, string, number, date, array } from 'yup';

// yup validation schema
export const yup = { object, string, number, date, array };

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


//Wrapper
export class Time {
  hours: number;
  minutes: number;

  constructor(hours = 0, minutes = 0) {
    this.hours = hours;
    this.minutes = minutes;
  }

  toString() {
    return `${this.hours}h ${this.minutes} min`;
  }
}

