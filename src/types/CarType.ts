export interface CarType {
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface TCanvas {
  initCanvas: () => void;
  animate: () => void;
}
