import {
  CAR_HEIGHT,
  CAR_WIDTH,
  CAR_X_POX,
  CAR_Y_POS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "../constants/DefaultValues/EntitiesDimmensions";
import { Car } from "./entities/Car";
import { VehicleType, TCanvas, VehicleSpeed } from "../types/CarTypes";
import { Road } from "./entities/Road";
import { BLACK } from "../constants/DefaultValues/colors";

export class Canvas implements TCanvas {
  private ctx: CanvasRenderingContext2D | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private car: Car;
  private road: Road;
  private traffic: Car[];

  constructor() {
    this.initCanvas();
    this.road = new Road(this.canvas?.width! / 2, this.canvas?.width! * 0.9);
    this.car = new Car(
      this.road.getLaneCenter(1),
      CAR_Y_POS,
      CAR_WIDTH,
      CAR_HEIGHT,
      VehicleType.PLAYER,
      VehicleSpeed.AVERAGE
    );
    this.traffic = [
      new Car(
        this.road.getLaneCenter(1),
        -100,
        30,
        50,
        VehicleType.NPC,
        VehicleSpeed.SLOW
      ),
    ];
  }

  public initCanvas(): void {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if (!this.canvas) return;

    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext("2d");
  }

  public animate(): void {
    for (let i = 0; i < this.traffic.length; i++) {
      this.traffic[i].update(this.road.borders, []);
    }

    this.car.update(this.road.borders, this.traffic);

    this.ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.ctx?.save();
    this.ctx?.translate(0, -this.car.y + this.canvas?.height! * 0.7);

    this.road.draw(this.ctx!);
    for (const car of this.traffic) {
      car.draw(this.ctx!, "blue");
    }
    this.car.draw(this.ctx!, BLACK);

    this.ctx?.restore();

    requestAnimationFrame(this.animate.bind(this));
  }
}
