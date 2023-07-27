import { Border } from "./RoadTypes";
import { Car } from "../modules/entities/Car";

export enum VehicleType {
  AI = "AI",
  NPC = "NPC",
  PLAYER = "PLAYER",
}

export enum VehicleSprite {
  NORMAL = "NORMAL",
  TRUCK = "TRUCK",
  MOTOR = "MOTOR",
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
