import { CarType, VehicleType } from "../../types/CarTypes";
import { InputController } from "../../helpers/InputController";
import { Sensor } from "../Sensor";
import { Border } from "../../types/RoadTypes";
import { Positions } from "../../types/CommonTypes";
import { polyInstersect } from "../../utility/polyIntersect";
import { RED } from "../../constants/DefaultValues/colors";
import { NeuralNetwork } from "../../network/index";

export class Car implements CarType {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  acceleration: number;
  maxSpeed: number;
  friction: number;
  angle: number;
  damaged: boolean;
  isDone: boolean;
  polygon: Positions[] = [];
  controls: InputController;
  sensor: Sensor | null = null;
  carType: VehicleType;
  brain: NeuralNetwork | null = null;
  useBrain: any;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    vehicleType: VehicleType,
    maxSpeed = 3
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false;
    this.carType = vehicleType;
    this.isDone = false;

    this.useBrain = vehicleType == VehicleType.AI;

    this.controls = new InputController(vehicleType);
    if (vehicleType != VehicleType.NPC) {
      this.sensor = new Sensor();
      this.brain = new NeuralNetwork([this.sensor.rayCount, 20]);
    }
  }

  private upDownControlls(): void {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 1.7) {
      this.speed = -this.maxSpeed / 1.7;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  private leftRightControlls() {
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }
  }

  private assesDamage(roadBorders: Border[][], traffic: Car[]) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polyInstersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    for (let i = 0; i < traffic.length; i++) {
      if (polyInstersect(this.polygon, traffic[i].polygon)) {
        return true;
      }
    }
    return false;
  }

  public update(roadBorders: Border[][], traffic: Car[]): void {
    if (!this.damaged) {
      this.upDownControlls();
      this.leftRightControlls();
      this.polygon = this.createPolygon();
      this.damaged = this.assesDamage(roadBorders, traffic);
    }
    if (this.sensor) {
      this.sensor.update(this.x, this.y, this.angle, roadBorders, traffic);

      const offsets = this.sensor.readings.map((reading) => {
        return reading == null ? 0 : 1 - reading.offset;
      });
      const outputs = NeuralNetwork.feedForward(offsets, this.brain!);
      if (this.useBrain) {
        this.controls.forward = Boolean(outputs[0]);
        this.controls.left = Boolean(outputs[1]);
        this.controls.right = Boolean(outputs[2]);
        this.controls.reverse = Boolean(outputs[3]);
      }
      if (this.y < -10000) {
        this.isDone = true;
      }
    }
  }

  private createPolygon() {
    const points: Positions[] = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    color: string,
    drawSensor: boolean = false
  ): void {
    ctx.beginPath();
    if (this.damaged) {
      ctx.fillStyle = RED;
    } else {
      ctx.fillStyle = color;
    }
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    if (this.sensor && drawSensor) {
      this.sensor.draw(ctx);
    }
  }
}
