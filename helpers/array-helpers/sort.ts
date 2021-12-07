export const Ascending = (a: number, b: number) => a - b;
export const Descending = (a: number, b: number) => b - a;

/*
[ 16, 1, 2, 0, 4, 2, 7, 1, 2, 14 ].sort(Ascending) == [ 0, 1, 1, 2, 2, 2, 4, 7, 14, 16 ]

[ 16, 1, 2, 0, 4, 2, 7, 1, 2, 14 ].sort(Ascending) == [ 16, 14, 7, 4, 2, 2, 2, 1, 1, 0 ]

*/
