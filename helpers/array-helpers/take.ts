export const take = (numberToTake: number) => <T>(arr: T[], index: number) =>
  arr.slice(index, index + numberToTake);
