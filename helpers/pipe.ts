//can't be accurately typed in TypeScript
//@ts-ignore
export const pipe = (...fns) =>
  fns.reduce(
    (acc, val) =>
      //@ts-ignore
      (...args) =>
        val(acc(...args))
  );
