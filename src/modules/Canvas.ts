import {
  CAR_HEIGHT,
  CAR_WIDTH,
  CAR_X_POX,
  CAR_Y_POS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "../constants/DefaultValues/EntitiesDimmensions";
import { Car } from ".././entities/Car";
import { TCanvas } from "../types/CarType";
import { Road } from "../entities/Road";

export class Canvas implements TCanvas {
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private car: Car;
  private road: Road;

  constructor() {
    this.initCanvas();
    this.car = new Car(CAR_X_POX, CAR_Y_POS, CAR_WIDTH, CAR_HEIGHT);
    this.road = new Road(this.canvas?.width! / 2, this.canvas?.width! * 0.9);
  }

  public initCanvas(): void {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if (!this.canvas) return;

    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext("2d");
    this.car = new Car(CAR_X_POX, CAR_Y_POS, CAR_WIDTH, CAR_HEIGHT);
    this.car.draw(this.ctx!);
  }

  public animate(): void {
    this.ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.car.update();
    this.road.draw(this.ctx!);
    this.car.draw(this.ctx!);

    requestAnimationFrame(this.animate.bind(this));
  }
}
