export type Positions = {
  x: number;
  y: number;
};

export interface TCanvas {
  initCanvas: () => void;
  animate: () => void;
}

export enum Logger {
  Message = 0,
  Warn = 1,
  Error = 2,
}
