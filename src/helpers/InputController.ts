import { CarControls } from "../constants/controllEnums";
import { VehicleType } from "../types/CarType";
export class InputController {
  forward: boolean;
  left: boolean;
  reverse: boolean;
  right: boolean;

  constructor(carType: VehicleType) {
    this.forward = false;
    this.left = false;
    this.right = false;
    this.reverse = false;

    switch (carType) {
      case VehicleType.NPC:
        this.forward = true;
      case VehicleType.PLAYER:
        this.addKeyBoardListeners();
    }
  }

  private addKeyBoardListeners(): void {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case CarControls.LEFT:
          this.left = true;
          break;
        case CarControls.RIGHT:
          this.right = true;
          break;
        case CarControls.BACK:
          this.reverse = true;
          break;
        case CarControls.FORWARD:
          this.forward = true;
          break;
      }
      window.addEventListener("keyup", (e: KeyboardEvent) => {
        switch (e.key) {
          case CarControls.LEFT:
            this.left = false;
            break;
          case CarControls.RIGHT:
            this.right = false;
            break;
          case CarControls.BACK:
            this.reverse = false;
            break;
          case CarControls.FORWARD:
            this.forward = false;
            break;
        }
      });
    });
  }
}
