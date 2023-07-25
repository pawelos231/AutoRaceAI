export interface CarType {
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: () => void;
}

export interface TCanvas {
  initCanvas: () => void;
  animate: () => void;
}
