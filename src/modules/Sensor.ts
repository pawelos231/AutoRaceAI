import { Car } from "./entities/Car";
import { lerp } from "../math/lerp";
import { YELLOW, BLACK } from "../constants/DefaultValues/colors";
import { Border } from "../types/RoadTypes";
import { getIntersection } from "../math/intersections";
import { Reading } from "../types/SensorTypes";
import { Positions } from "../types/CommonTypes";

const DEFAULT_RAY_COUNT = 4;

export class Sensor {
  car: Car;
  rayCount: number;
  rayLength: number;
  raySpread: number;
  rays: Positions[][]; // for now
  readings: Reading[];
  constructor(car: Car, rayCount: number = DEFAULT_RAY_COUNT) {
    this.car = car;
    this.rayCount = rayCount;
    this.rayLength = 250;
    this.raySpread = Math.PI / 2;
    this.rays = [];
    this.readings = [];
  }

  private castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;
      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };
      this.rays.push([start, end]);
    }
  }

  public update(roadBorders: Border[][], traffic: Car[]): void {
    this.castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.getReading(this.rays[i], roadBorders, traffic));
    }
  }

  private getReading(
    ray: any,
    roadBorders: Border[][],
    traffic: Car[]
  ): Reading {
    let touches = [];

    for (let i = 0; i < roadBorders.length; i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );
      if (touch) {
        touches.push(touch);
      }
    }

    for (let i = 0; i < traffic.length; i++) {
      const poly = traffic[i].polygon;
      for (let j = 0; j < poly.length; j++) {
        const value = getIntersection(
          ray[0],
          ray[1],
          poly[j],
          poly[(j + 1) % poly.length]
        );
        if (value) {
          touches.push(value);
        }
      }
    }

    if (touches.length === 0) return null;
    else {
      const offsets = touches.map((e) => e.offset);
      const minOffset = Math.min(...offsets);
      return touches.find((e) => e.offset == minOffset);
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i++) {
      let end = this.rays[i][1];
      if (this.readings[i]) {
        end = this.readings[i]!;
      }
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = YELLOW;
      ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = BLACK;
      ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
