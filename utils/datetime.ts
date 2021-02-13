import { DateTime } from "luxon";

// YYYY-MM-DD
export const getISODateString = (date: Date | string) => {
  const datetime =
    typeof date === "object"
      ? DateTime.fromJSDate(date)
      : DateTime.fromISO(date);

  return datetime.toISODate();
};

// YYYY年MM月DD日
export const getLocalizedDateString = (date: Date | string) => {
  const datetime =
    typeof date === "object"
      ? DateTime.fromJSDate(date)
      : DateTime.fromISO(date);

  return datetime.setLocale("ja").toFormat("DD");
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
  const datetime =
    typeof date === "object"
      ? DateTime.fromJSDate(date)
      : DateTime.fromISO(date);

  return datetime.setLocale("ja").toFormat(format);
};
