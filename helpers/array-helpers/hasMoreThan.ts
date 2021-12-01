export const hasMoreThan =
  (num: number) =>
  <T>(arr: T[], index: number): Boolean =>
    arr.slice(index).length >= num;
