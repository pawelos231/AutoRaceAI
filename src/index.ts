import { CarCanvas } from "./modules/CarsCanvas";
import { NauralNetworkCanvas } from "./modules/NetworkCanvas";

const canvas = new CarCanvas();
const neuralCanvas = new NauralNetworkCanvas();
canvas.animate();
neuralCanvas.animate();
