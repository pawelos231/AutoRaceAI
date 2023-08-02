import { lerp } from "three/src/math/MathUtils";
import { Level } from "./level";

export class NeuralNetwork {
  levels: Level[];
  fitness: number;
  constructor(neuronCounts: number[]) {
    this.levels = [];
    for (let i = 0; i < neuronCounts.length - 1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
    this.fitness = 0;
  }

  static feedForward(givenInputs: number[], network: NeuralNetwork): number[] {
    let outputs = Level.feedForward(givenInputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      outputs = Level.feedForward(outputs, network.levels[i]);
    }
    return outputs;
  }

  calculateFitness(expectedOutputs: number[], actualOutputs: number[]): void {
    let sumSquaredError = 0;
    for (let i = 0; i < expectedOutputs.length; i++) {
      sumSquaredError += (expectedOutputs[i] - actualOutputs[i]) ** 2;
    }
    this.fitness = 1 / (1 + sumSquaredError);
  }

  static mutate(network: NeuralNetwork, amount = 1) {
    network.levels.forEach((level: Level) => {
      for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
      }
      for (let i = 0; i < level.weights.length; i++) {
        for (let j = 0; j < level.weights[i].length; j++) {
          level.weights[i][j] = lerp(
            level.weights[i][j],
            Math.random() * 2 - 1,
            amount
          );
        }
      }
    });
  }
  clone(): NeuralNetwork {
    const clonedNetwork = new NeuralNetwork([]);
    clonedNetwork.levels = this.levels.map((level) => level.clone());
    clonedNetwork.fitness = this.fitness;
    return clonedNetwork;
  }
}
