export enum SlotGrid {
  FIVE = 5,
  TEN = 10,
  FIFTEEN = 15,
  THIRTY = 30,
  SIXTY = 60,
};

export function randomEnum<T>(anEnum: T): T[keyof T] {
  const values = (Object.values(anEnum) as unknown) as T[keyof T][];
  const start = values.length / 2;
  const index = start + Math.floor(Math.random() * start);
  return values[index];
}