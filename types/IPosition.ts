export const positions = ["GKP", "DEF", "MID", "FWD"] as const;
export type IPosition = typeof positions[number];
