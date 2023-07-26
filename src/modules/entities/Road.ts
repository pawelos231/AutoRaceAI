import {
  DEFAULT_LANE_COUNT,
  infinity,
} from "../../constants/DefaultValues/EntitiesDimmensions";
import { WHITE } from "../../constants/DefaultValues/colors";
import { lerp } from "../../math/lerp";
import { DEFAULT_LINE_WIDTH } from "../../constants/DefaultValues/EntitiesDimmensions";
import { Border } from "../../types/RoadTypes";

export class Road {
  x: number;
  width: number;
  laneCount: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  borders: Border[][];
  constructor(
    x: number,
    width: number,
    laneCount: number = DEFAULT_LANE_COUNT
  ) {
    this.left = x - width / 2;
    this.right = x + width / 2;
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };

    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };

    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  private drawLine(
    x: number,
    dashed: boolean = false,
    ctx: CanvasRenderingContext2D
  ) {
    ctx.setLineDash(dashed ? [20, 20] : []);
    ctx.beginPath();
    ctx.moveTo(x, this.top);
    ctx.lineTo(x, this.bottom);
    ctx.stroke();
  }

  public getLaneCenter(laneIndex: number) {
    const laneWidth = this.width / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!ctx) return;
    ctx.lineWidth = DEFAULT_LINE_WIDTH;
    ctx.strokeStyle = WHITE;

    for (let i = 1; i <= this.laneCount - 1; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);

      this.drawLine(x, true, ctx);
    }
    ctx.setLineDash([]);
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}
