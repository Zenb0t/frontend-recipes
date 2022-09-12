import { object, string, number, date, array } from 'yup';

// yup validation schema
export const yup = { object, string, number, date, array };

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


//Wrapper around a Time object
export interface Time {
  hours: number;
  minutes: number;
}



  //**Returns in Time in the format h mm */
  export function timeToStringShort(time: Time): string {
    return `${time.hours} h ${time.minutes} min`;
  }

