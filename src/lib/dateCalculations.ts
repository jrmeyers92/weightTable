export const calculateTimeBetweenDates = (
  startDate: Date,
  endDate: Date
): { days: number; weeks: number; months: number } => {
  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
  const differenceInWeeks = differenceInDays / 7;
  const differenceInMonths = differenceInDays / 30.44; // Average days in a month

  return {
    days: Math.round(differenceInDays),
    weeks: Math.round(differenceInWeeks),
    months: Math.round(differenceInMonths),
  };
};
