import { CarType } from "../types/CarType";
import { InputController } from "../helpers/InputController";

export class Car implements CarType {
  x: number;
  y: number;
  width: number;
  height: number;
  controls: InputController;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.controls = new InputController();
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
  }
  update() {
    if (this.controls.forward) {
      this.y -= 2;
    }
    if (this.controls.reverse) {
      this.y += 2;
    }
    if (this.controls.left) {
      this.x -= 2;
    }
    if (this.controls.right) {
      this.x += 2;
    }
  }
}
