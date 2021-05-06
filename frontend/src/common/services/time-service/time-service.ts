import moment from 'moment';

type Time = number | string;

export enum TIMEFORMATS {
    NATURAL_DATE_FORMAT = 'DD.MM.YYYY, HH:mm:ss',
    DAYS_ONLY = 'DD.MM',
    CLOCK_24_FORMAT = 'HH:mm',
}

export const convertTimestamp = (date: Time, format: string = TIMEFORMATS.NATURAL_DATE_FORMAT) => {
    return moment.utc(date).local().format(format);
};
