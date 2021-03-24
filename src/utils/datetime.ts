export const isBetween = (date: Date, [start, end]: Date[]): boolean => {
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
};