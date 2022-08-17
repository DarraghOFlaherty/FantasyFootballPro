export const prices = [
  14.0, 13.5, 13.0, 12.5, 12.0, 11.5, 11.0, 10.5, 10.0, 9.5, 9.0, 8.5, 8.0, 7.5,
  7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0,
] as const;
export type IPrice = typeof prices[number];
