
import { startOfDay, addDays } from 'date-fns';

interface IRandomDateArgs {
  beginFrom: Date;
  offset: number;
}

interface IRandomDateWithinArgs {
  begin: Date;
  until: Date;
  slot: number;
}

/*
  @description: Generates random number between minimum and minimum number
*/
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/*
  @description: Generates random number between minimum and minimum number
*/
export const randomNumberByFactor = (min: number, max: number, offset = 1): number => {
  return randomNumber(min / offset, max / offset) * offset;
};

/*
  @description: Generates random date between today and offset given
*/
export const randomDate = (options?: IRandomDateArgs): Date => {
  const offset = options?.offset || 20;
  const start = options?.beginFrom || startOfDay(new Date());
  return startOfDay(addDays(start, randomNumber(0, offset)));
};

export const randomDateInRange = ({ begin, until, slot }: IRandomDateWithinArgs): Date => {
  const [startTime, endTime] = [begin.getTime(), until.getTime()];
  return new Date(randomNumberByFactor(startTime, endTime, slot * 6e4));
};

/*
  @description: Generate a random enum value property from the given values
*/
export function randomEnum<T>(anEnum: T): T[keyof T] {
  const values = (Object.values(anEnum) as unknown) as T[keyof T][];
  const start = values.length / 2;
  const index = start + Math.floor(Math.random() * start);
  return values[index];
};

export const RandomGenerator = {
  enum: randomEnum,
  date: randomDate,
  randomDateInRange,
  number: randomNumber,
};

export default RandomGenerator;
