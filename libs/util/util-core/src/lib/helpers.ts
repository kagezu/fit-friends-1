import { plainToInstance, ClassConstructor } from 'class-transformer';

const RADIX = 10;
const CHANCE_TRIGGER = .3;


export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };


export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, RADIX);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

export function getMongoConnectionString(
  {
    username,
    password,
    host,
    port,
    databaseName,
    authDatabase,
  }: {
    username?: string,
    password?: string,
    host?: string,
    port?: string,
    databaseName?: string,
    authDatabase?: string,
  }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  Number(((Math.random() * (max - min)) + min).toFixed(numAfterDigit));

export const getRandomItem = <T>(items: T[]): T =>
  items[generateRandomValue(0, items.length - 1)];

export const getRandomItems = <T>(items: T[]): T[] => ((items.filter(() => Math.random() < CHANCE_TRIGGER) || [getRandomItem<T>(items)]));
