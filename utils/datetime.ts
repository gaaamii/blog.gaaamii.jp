import { DateTime } from "luxon";

// YYYY-MM-DD
export const getDateString = (date: Date | string) => {
  if (typeof date === "object") {
    return DateTime.fromJSDate(date).toISODate();
  } else {
    return DateTime.fromISO(date).toFormat("DD");
  }
};
// HH:mm
export const getTimeString = (date: Date | string) => {
  const format = "HH:mm";
  return formatTimeString(date, format);
};
// HH:mm:ss
export const getFullTimeString = (date: Date | string) => {
  const format = "HH:mm:ss";
  return formatTimeString(date, format);
};

const formatTimeString = (date: Date | string, format: string) => {
  if (typeof date === "object") {
    return DateTime.fromJSDate(date).toFormat(format);
  } else {
    return DateTime.fromISO(date).toFormat(format);
  }
};
