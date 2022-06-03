import moment from 'moment';

export const isDateAfterNow = (current: any) => {
  return current && current > moment().endOf('day');
};

export enum DateFormatEnum {
  STANDARD_DATE = 'DD/MM/YYYY',
  STANDARD_MONTH_YEAR = 'MM/YYYY',
}
