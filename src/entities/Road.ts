import {
  DEFAULT_LANE_COUNT,
  infinity,
} from "../constants/DefaultValues/EntitiesDimmensions";
import { WHITE } from "../constants/DefaultValues/colors";
import { lerp } from "../math/lerp";
import { DEFAULT_LINE_WIDTH } from "../constants/DefaultValues/EntitiesDimmensions";

export class Road {
  x: number;
  width: number;
  laneCount: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
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


  private getLaneCenter(){
    
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!ctx) return;
    ctx.lineWidth = DEFAULT_LINE_WIDTH;
    ctx.strokeStyle = WHITE;

    for (let i = 0; i <= this.laneCount; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);

      const shouldBeDashed = i > 0 && i < this.laneCount;
      this.drawLine(x, shouldBeDashed, ctx);
    }
  }
}
