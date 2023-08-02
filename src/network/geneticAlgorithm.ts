import { NeuralNetwork } from "./index";
import { Border } from "../types/RoadTypes";

export class GeneticAlgorithm {
  static trainNeuralNetworks(
    population: NeuralNetwork[],
    roadBorders: Border[][],
    traffic: Car[]
  ) {
    for (const neuralNetwork of population) {
      const car = new Car();
      car.brain = neuralNetwork;
      car.update(roadBorders, traffic);
    }
  }
}
