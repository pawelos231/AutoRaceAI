class Sprite {
  private image: HTMLImageElement;
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(
    imageUrl: string,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.image = new Image();
    this.image.src = imageUrl;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  public update() {
    
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }
}
