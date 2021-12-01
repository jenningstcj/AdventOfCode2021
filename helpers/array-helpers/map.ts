export const map =
  <A, B>(f: (value: A) => B) =>
  (arr: A[]): B[] =>
    arr.map(f);
