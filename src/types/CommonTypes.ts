export type Positions = {
  x: number;
  y: number;
};

export interface TCanvas {
  initCanvas: () => void;
  animate: () => void;
}
