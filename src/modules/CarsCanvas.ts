import {
  CAR_HEIGHT,
  CAR_WIDTH,
  CAR_Y_POS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "../constants/DefaultValues/EntitiesDimmensions";
import { Car } from "./entities/Car";
import { VehicleType, VehicleSpeed } from "../types/CarTypes";
import { TCanvas } from "../types/CommonTypes";
import { Road } from "./entities/Road";
import { BLACK, BLUE } from "../constants/DefaultValues/colors";
import { Common } from "./Common";
import { CAR_CANVAS_ID } from "../constants/classNames";

export class CarCanvas extends Common<false> implements TCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private car: Car;
  private road: Road;
  private traffic: Car[];

  constructor() {
    super();
    this.canvas = this.bindElementById(CAR_CANVAS_ID) as HTMLCanvasElement;
    this.initCanvas();

    this.road = new Road(this.canvas?.width! / 2, this.canvas?.width! * 0.5);
    this.car = new Car(
      this.road.getLaneCenter(1),
      CAR_Y_POS,
      CAR_WIDTH,
      CAR_HEIGHT,
      VehicleType.AI,
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
      car.draw(this.ctx!, BLUE);
    }
    this.car.draw(this.ctx!, BLACK);

    this.ctx?.restore();

    requestAnimationFrame(this.animate.bind(this));
  }
}
