export const hasMoreThan = (num: number) => <T>(arr: T[], index: number) =>
  arr.slice(index).length >= num;
