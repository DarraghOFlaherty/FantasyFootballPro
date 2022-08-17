import { IClub } from "./IClub";
import { IPosition } from "./IPosition";

export interface IPlayer {
  id: string;
  code: string;
  name: string;
  club: IClub;
  position: IPosition;
  price: number;
  points: number;
  ppg: number;
  ppm: number;
  expectedPoints: number;
  chanceOfPlaying: number | null;
  selectedByPercent: number;
}
