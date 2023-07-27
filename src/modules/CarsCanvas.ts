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
  private cars: Car[];
  private road: Road;
  private traffic: Car[];
  private bestCar: Car | null = null;

  constructor() {
    super();

    this.canvas = this.bindElementById(CAR_CANVAS_ID) as HTMLCanvasElement;
    this.initCanvas();

    if (localStorage.getItem("bestBrain")) {
      this.bestCar = JSON.parse(localStorage.getItem("bestBrain")!);
    }

    this.road = new Road(this.canvas?.width! / 2, this.canvas?.width! * 0.5);
    this.cars = this.generateCars(500);
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

    for (const car of this.cars) {
      car.update(this.road.borders, this.traffic);
    }
    this.bestCar = this.cars.find((car) => {
      return car.y == Math.min(...this.cars.map((c) => c.y));
    })!;

    this.ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.ctx?.save();
    this.ctx?.translate(0, -this.bestCar.y + this.canvas?.height! * 0.7);

    this.road.draw(this.ctx!);
    for (const car of this.traffic) {
      car.draw(this.ctx!, BLUE);
    }

    this.ctx!.globalAlpha = 0.2;

    for (const car of this.cars) {
      car.draw(this.ctx!, BLACK);
    }
    this.ctx!.globalAlpha = 1;
    this.bestCar.draw(this.ctx!, BLACK, true);

    this.ctx?.restore();

    requestAnimationFrame(this.animate.bind(this));
  }

  private generateCars(N: number): Car[] {
    const cars = [];
    for (let i = 1; i <= N; i++) {
      cars.push(
        new Car(
          this.road.getLaneCenter(1),
          CAR_Y_POS,
          CAR_WIDTH,
          CAR_HEIGHT,
          VehicleType.AI,
          VehicleSpeed.AVERAGE
        )
      );
    }
    return cars;
  }

  private save() {
    localStorage.setItem("bestBrain", JSON.stringify(this.bestCar!));
  }

  private discard() {
    localStorage.removeItem("bestBrain");
  }
}
