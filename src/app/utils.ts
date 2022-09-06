import { object, string, number, date, array } from 'yup';

export const yup = { object, string, number, date, array };

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

