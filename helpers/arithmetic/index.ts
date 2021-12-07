export { sum } from "./sum";
import { Ascending } from "../array-helpers/sort";
import { sum } from "./sum";

export const findMean = (numbers: number[]): number => {
  return Math.round(sum(numbers) / numbers.length);
};

export const findMedian = (numbers: number[]): number => {
  numbers = numbers.sort(Ascending);
  const half = Math.floor(numbers.length / 2);

  return numbers.length % 2
    ? numbers[half]
    : (numbers[half - 1] + numbers[half]) / 2.0;
};

export const makePositive = (num: number): number => (num < 0 ? -num : num);

export const findLowestNumber = (numbers: number[]) =>
  numbers.reduce((prev, curr) => Math.min(prev, curr), Number.MAX_VALUE);

export const findHighestNumber = (numbers: number[]) =>
  numbers.reduce((prev, curr) => Math.max(prev, curr), Number.MIN_VALUE);
