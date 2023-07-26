import { CarType, VehicleType } from "../../types/CarType";
import { InputController } from "../../helpers/InputController";
import { Sensor } from "../Sensor";
import { Border } from "../../types/RoadTypes";
import { Posistions } from "../../types/CommonTypes";
import { polyInstersect } from "../../utility/polyIntersect";
import { RED, BLACK } from "../../constants/DefaultValues/colors";

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
  polygon: Posistions[] = [];
  controls: InputController;
  sensor: Sensor;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    carType: VehicleType
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false;

    this.controls = new InputController(carType);
    this.sensor = new Sensor(this);
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

  private assesDamage(roadBorders: Border[][]) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polyInstersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    return false;
  }

  public update(roadBorders: Border[][]): void {
    if (!this.damaged) {
      this.upDownControlls();
      this.leftRightControlls();
      this.polygon = this.createPolygon();
      this.damaged = this.assesDamage(roadBorders);
    }

    this.sensor.update(roadBorders);
  }

  private createPolygon() {
    const points: Posistions[] = [];
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

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    if (this.damaged) {
      ctx.fillStyle = RED;
    } else {
      ctx.fillStyle = BLACK;
    }
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();

    this.sensor.draw(ctx);
  }
}
