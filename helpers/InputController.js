import { CarControls } from "../constants/controllEnums";
import { VehicleType } from "../types/CarTypes";
export class InputController {
    constructor(carType) {
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;
        switch (carType) {
            case VehicleType.NPC:
                this.forward = true;
                break;
            case VehicleType.PLAYER:
                this.addKeyBoardListeners();
                break;
            default:
                this.addKeyBoardListeners();
        }
    }
    addKeyBoardListeners() {
        window.addEventListener("keydown", (e) => {
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
            window.addEventListener("keyup", (e) => {
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
