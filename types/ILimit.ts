export const limits = [10, 20, 50] as const;
export type ILimit = typeof limits[number];
