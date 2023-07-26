import { Border } from "./RoadTypes";
import { Car } from "../modules/entities/Car";

export enum VehicleType {
  NPC = "NPC",
  PLAYER = "PLAYER",
}

export enum VehicleSpeed {
  SLOW = 2,
  AVERAGE = 3,
  FAST = 4,
  ULTRA_FAST = 5,
}

export interface CarType {
  draw: (ctx: CanvasRenderingContext2D, color: string) => void;
  update: (roadBorders: Border[][], traffic: Car[]) => void;
}

export interface TCanvas {
  initCanvas: () => void;
  animate: () => void;
}
