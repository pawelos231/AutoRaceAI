import {
  CAR_HEIGHT,
  CAR_WIDTH,
  CAR_X_POX,
  CAR_Y_POS,
} from ".././constants/EntitiesDimmensions";
import { Car } from ".././entities/Car";
import { TCanvas } from "../types/CarType";

export class Canvas implements TCanvas {
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private car: Car;

  constructor() {
    this.car = new Car(CAR_X_POX, CAR_Y_POS, CAR_WIDTH, CAR_HEIGHT);
    this.initCanvas();
  }

  public initCanvas(): void {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if (!this.canvas) return;

    this.canvas.width = 800;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext("2d");
    this.car = new Car(CAR_X_POX, CAR_Y_POS, CAR_WIDTH, CAR_HEIGHT);
    this.car.draw(this.ctx!);
  }

  public animate(): void {
    this.ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.car.update();
    this.car.draw(this.ctx!);
    requestAnimationFrame(this.animate.bind(this));
  }
}
