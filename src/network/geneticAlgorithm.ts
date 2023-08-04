import { NeuralNetwork } from "./index";
import { Car } from "../modules/entities/Car";
import { DEFAULT_MUTATION_AMOUNT } from "../constants/DefaultValues/neuralNetworkConsts";

export class GeneticAlgorithm {
  static trainNeuralNetworks(cars: Car[], population: NeuralNetwork[]) {
    for (let i = 0; i < cars.length; i++) {
      const fitness = cars[i].calculateFitness();
      cars[i].brain!.fitness = fitness || 0;
      population[i] = cars[i].brain!;
    }
  }

  public static evolvePopulation(
    population: NeuralNetwork[],
    rayCount: number
  ): NeuralNetwork[] {
    const newGeneration: NeuralNetwork[] = [];

    const selectedNets = GeneticAlgorithm.selection(population);

    while (newGeneration.length < population.length) {
      const parent1 = GeneticAlgorithm.getRandomElement(selectedNets);
      const parent2 = GeneticAlgorithm.getRandomElement(selectedNets);
      const offspring = GeneticAlgorithm.crossover(parent1, parent2, rayCount);
      newGeneration.push(offspring);
    }
    GeneticAlgorithm.mutate(newGeneration);

    return newGeneration;
  }

  private static selection(population: NeuralNetwork[]): NeuralNetwork[] {
    const sortedPopulation = population.sort((a, b) => b.fitness - a.fitness);
    console.log(sortedPopulation);

    // Choose the top half neural networks as selectedNets
    const selectedNets = sortedPopulation.slice(
      0,
      Math.ceil(sortedPopulation.length / 2)
    );

    return selectedNets;
  }

  private static crossover(
    parent1: NeuralNetwork,
    parent2: NeuralNetwork,
    raycount: number
  ): NeuralNetwork {
    // Perform single-point crossover
    const child = new NeuralNetwork([raycount, 10, 10]);

    const crossoverPoint = Math.floor(Math.random() * parent1.levels!.length);

    for (let i = 0; i < parent1.levels.length; i++) {
      if (i < crossoverPoint) {
        // Copy the level from parent 1 to the child
        child.levels[i] = JSON.parse(JSON.stringify(parent1.levels[i]));
        child.fitness = parent1.fitness;
      } else {
        // Copy the level from parent 2 to the child
        child.levels[i] = JSON.parse(JSON.stringify(parent2.levels[i]));
        child.fitness = parent2.fitness;
      }
    }

    return child;
  }

  private static mutate(population: NeuralNetwork[]): void {
    for (const neuralNetwork of population) {
      NeuralNetwork.mutate(neuralNetwork, DEFAULT_MUTATION_AMOUNT / 2);
    }
  }

  private static getRandomElement<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
}
