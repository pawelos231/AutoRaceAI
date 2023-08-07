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
import { GeneticAlgorithm } from "../network/geneticAlgorithm";
import { DEFAULT_MUTATION_AMOUNT } from "../constants/DefaultValues/neuralNetworkConsts";
import { END_OF_MAP_TOP } from "../constants/DefaultValues/EntitiesDimmensions";
import { TRAFFIC_MOCK_DATA } from "../data/traffic";

const ROAD_WIDTH_MULTIPLIER = 0.9;
const CARS_TO_TRAIN_COUNT = 300;

export class CarCanvas extends Common<false> implements TCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private road: Road;
  private traffic: Car[];
  private cars: Car[];
  private bestCar: Car | null = null;
  private population: NeuralNetwork[];
  private generation: number;

  constructor() {
    super();
    this.cleanUpOfCars();
    this.population = [];
    this.canvas = this.bindElementById(CAR_CANVAS_ID) as HTMLCanvasElement;
    this.initCanvas();
    this.save();
    this.traffic = [];
    this.road = new Road(
      this.canvas?.width! / 2,
      this.canvas?.width! * ROAD_WIDTH_MULTIPLIER
    );
    this.cars = this.generateCars(CARS_TO_TRAIN_COUNT);

    this.traffic = this.generateMockTrafficNonRandom();
    this.generation = 0;
  }

  public initCanvas(): void {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext("2d");
  }

  private shouldCarsTrain(): void {
    this.bestCar = this.cars.find((car) => {
      return car.y == Math.min(...this.cars.map((c) => c.y));
    })!;

    if (this.bestCar.y < END_OF_MAP_TOP / 2) {
      GeneticAlgorithm.trainNeuralNetworks(
        this.cars,
        this.population,
        this.traffic.map((car) => car.y)
      );

      this.population = GeneticAlgorithm.evolvePopulation(
        this.population,
        this.cars[0].sensor?.rayCount!,
        this.generation,
        this.population[0].fitness
      );

      this.population.sort((a, b) => b.fitness - a.fitness);
      const bestFit = this.population[0].fitness;

      const averageFit =
        this.population.reduce((a, b) => a + b.fitness, 0) /
        this.population.length;

      console.log("BEST FIT:", bestFit, "\n AVG FIT:", averageFit);

      const localBrain: NeuralNetwork = JSON.parse(
        localStorage.getItem(BEST_CAR_LOCAL)!
      );
      if (localBrain && bestFit > localBrain.fitness) {
        this.cars[0].brain = this.population[0];
        this.bestCar.brain = this.population[0];
        this.saveBestCarToStorage();
      }
      if (!localBrain) {
        localStorage.setItem(
          BEST_CAR_LOCAL,
          JSON.stringify(this.population![0])
        );
      }
      this.generation++;
      this.cars = this.generateCars(CARS_TO_TRAIN_COUNT);
      this.traffic = this.generateMockTrafficNonRandom();
    }
  }

  public animate(): void {
    this.shouldCarsTrain();

    for (let i = 0; i < this.traffic.length; i++) {
      this.traffic[i].update(this.road.borders, []);
    }

    for (let i = 0; i < this.cars.length; i++) {
      if (!this.cars[i].damaged) {
        this.cars[i].update(this.road.borders, this.traffic);
      }
      if (this.cars[i].damaged && this.cars[i].snapshotOfTraffic.length == 0) {
        this.cars[i].snapshotOfTraffic = this.traffic.map((car) => car.y);
      }
    }

    this.ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.ctx?.save();
    this.ctx?.translate(0, -this.bestCar!.y + this.canvas?.height! * 0.7);

    this.road.draw(this.ctx!);
    for (const car of this.traffic) {
      car.draw(this.ctx!, BLUE);
    }

    this.ctx!.globalAlpha = 0.2;

    for (const car of this.cars) {
      if (!car.damaged) {
        car.draw(this.ctx!, BLACK);
      }
    }
    this.ctx!.globalAlpha = 1;
    this.bestCar!.draw(this.ctx!, BLACK, true);

    this.ctx?.restore();
    this.DrawGeneerationNumber();

    requestAnimationFrame(this.animate.bind(this));
  }

  private generateCars(N: number): Car[] {
    const cars = [];
    this.cars = [];
    let population: NeuralNetwork[] = [];
    if (this.population.length == 0) {
      console.log("CREATING NEW POPULATION");
    } else {
      console.log("USING OLD POPULATION");
    }
    for (let i = 1; i <= N; i++) {
      let car = new Car(
        this.road.getLaneCenter(1),
        CAR_Y_POS,
        CAR_WIDTH,
        CAR_HEIGHT,
        VehicleType.AI,
        VehicleSpeed.AVERAGE,
        this.road.getLaneCenter.bind(this.road),
        this.road.laneCount
      );
      cars.push(car);
      if (this.population.length == 0) {
        population.push(JSON.parse(JSON.stringify(car.brain!)));
        if (localStorage.getItem(BEST_CAR_LOCAL)) {
          if (i < 5) {
            car.brain = JSON.parse(localStorage.getItem(BEST_CAR_LOCAL)!);
          } else {
            NeuralNetwork.mutate(car.brain!, DEFAULT_MUTATION_AMOUNT);
          }
        }
      } else {
        if (localStorage.getItem(BEST_CAR_LOCAL)) {
          if (i < 5) {
            car.brain = JSON.parse(localStorage.getItem(BEST_CAR_LOCAL)!)!;
            this.population[i - 1] = car.brain!;
          } else {
            car.brain = JSON.parse(JSON.stringify(this.population[i - 1]));
          }
        }
      }
    }
    if (this.population.length == 0) {
      this.population = population;
    }

    return cars;
  }

  private saveBestCarToStorage() {
    localStorage.setItem(BEST_CAR_LOCAL, JSON.stringify(this.bestCar!.brain));
  }

  private save() {
    let save = this.bindElementByClass("save");
    save.addEventListener("click", () => {
      this.saveBestCarToStorage();
    });
  }

  private generateMockTrafficNonRandom() {
    const traffic = [];
    const MOCKED = TRAFFIC_MOCK_DATA(this.road);
    for (let i = 0; i < MOCKED.length; i++) {
      traffic.push(
        new Car(
          MOCKED[i].x,
          MOCKED[i].y,
          30,
          60,
          VehicleType.NPC,
          VehicleSpeed.SLOW,
          this.road.getLaneCenter.bind(this.road),
          this.road.laneCount
        )
      );
    }
    return traffic;
  }

  private generateRandomTraffic(numberOfCarsToGenerate: number) {
    const traffic = [];
    for (let i = 0; i < numberOfCarsToGenerate; i++) {
      traffic.push(
        new Car(
          this.road.getLaneCenter(getRandomValueBetweenNums(0, 3)),
          -(i * 180) - 300,
          getRandomValueBetweenNums(30, 40),
          getRandomValueBetweenNums(60, 70),
          VehicleType.NPC,
          VehicleSpeed.SLOW,
          this.road.getLaneCenter.bind(this.road),
          this.road.laneCount
        )
      );
    }
    return traffic;
  }

  private cleanUpNpcs() {
    for (let i = 0; i < this.traffic.length; i++) {
      if (Math.abs(this.bestCar!.y) - Math.abs(this.traffic[i].y) > 1000) {
        this.traffic.splice(i, 1);
      }
    }
  }

  private cleanUpAi() {
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i].damaged) {
        this.cars.splice(i, 1);
      }
    }
  }

  public cleanUpOfCars() {
    setInterval(() => {
      this.cleanUpNpcs();
    }, 1000);
  }

  private DrawGeneerationNumber() {
    this.ctx!.font = "24px Arial";
    this.ctx!.fillStyle = "black";
    this.ctx!.textAlign = "center";
    const x = 100;
    const y = 30;

    this.ctx!.fillText(`Generation: ${this.generation} `, x, y);
  }
}
