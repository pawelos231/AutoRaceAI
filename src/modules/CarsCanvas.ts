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
import { NeuralNetwork } from "../network/index";
import { BEST_CAR_LOCAL } from "../constants/classNames";
import { getRandomValueBetweenNums } from "../helpers/getRandomValue";

export class CarCanvas extends Common<false> implements TCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private road: Road;
  private traffic: Car[];
  private cars: Car[];
  private bestCar: Car | null = null;

  constructor() {
    super();

    this.canvas = this.bindElementById(CAR_CANVAS_ID) as HTMLCanvasElement;
    this.initCanvas();
    this.save();
    this.traffic = [];
    this.road = new Road(this.canvas?.width! / 2, this.canvas?.width! * 0.9);
    this.cars = this.generateCars(300);

    if (localStorage.getItem(BEST_CAR_LOCAL)) {
      for (let i = 0; i < this.cars.length; i++) {
        this.cars[i].brain = JSON.parse(localStorage.getItem(BEST_CAR_LOCAL)!);
        if (i > 0) {
          NeuralNetwork.mutate(this.cars[i].brain!, 0.2);
        }
      }
    }
    this.generateRandomTraffic(70);
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

    for (let i = 0; i < this.cars.length; i++) {
      this.cars[i].update(this.road.borders, this.traffic);
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
    let save = this.bindElementByClass("save");
    save.addEventListener("click", () => {
      localStorage.setItem(BEST_CAR_LOCAL, JSON.stringify(this.bestCar!.brain));
    });
  }

  private generateRandomTraffic(numberOfCarsToGenerate: number) {
    for (let i = 0; i < numberOfCarsToGenerate; i++) {
      this.traffic.push(
        new Car(
          this.road.getLaneCenter(getRandomValueBetweenNums(0, 3)),
          -(i * 200) - 300,
          getRandomValueBetweenNums(30, 50),
          getRandomValueBetweenNums(50, 70),
          VehicleType.NPC,
          VehicleSpeed.SLOW
        )
      );
    }
  }
}
