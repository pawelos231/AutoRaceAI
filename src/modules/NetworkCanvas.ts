import { TCanvas } from "../types/CommonTypes";
import { Common } from "./Common";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "../constants/DefaultValues/EntitiesDimmensions";
import { NEURAL_NETWORK_CANVAS_ID } from "../constants/classNames";

export class NauralNetworkCanvas extends Common<false> implements TCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() {
    super();
    this.canvas = this.bindElementById(
      NEURAL_NETWORK_CANVAS_ID
    ) as HTMLCanvasElement;
    this.initCanvas();
  }
  public initCanvas() {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext("2d");
  }
  public animate() {}
}
