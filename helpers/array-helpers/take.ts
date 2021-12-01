export const take = (numberToTake: number) => <T>(arr: T[], index: number):T[] =>
  arr.slice(index, index + numberToTake);
