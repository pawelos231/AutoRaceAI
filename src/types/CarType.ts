import { Border } from "./RoadTypes";

export interface CarType {
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: (roadBorders: Border[][]) => void;
}

export interface TCanvas {
  initCanvas: () => void;
  animate: () => void;
}
