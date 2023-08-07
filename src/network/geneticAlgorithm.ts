import { NeuralNetwork } from "./index";
import { Car } from "../modules/entities/Car";
import { DEFAULT_MUTATION_AMOUNT } from "../constants/DefaultValues/neuralNetworkConsts";

function getMutationAmount(
  currentGeneration: number,
  initialMutationAmount: number,
  decayRate: number,
  bestFitness: number
): number {
  const mutationAmount =
    initialMutationAmount /
    (1 + decayRate * currentGeneration) /
    (1 + bestFitness);

  const minMutationAmount = 0.01;
  return Math.max(mutationAmount, minMutationAmount);
}

export class GeneticAlgorithm {
  static trainNeuralNetworks(
    cars: Car[],
    population: NeuralNetwork[],
    traffic: number[]
  ) {
    for (let i = 0; i < cars.length; i++) {
      const fitness = cars[i].calculateFitness(traffic);
      cars[i].brain!.fitness = fitness || 0;
      population[i] = cars[i].brain!;
    }
  }

  public static evolvePopulation(
    population: NeuralNetwork[],
    rayCount: number,
    generation: number,
    bestFit: number
  ): NeuralNetwork[] {
    const newGeneration: NeuralNetwork[] = [];

    const selectedNets = GeneticAlgorithm.selection(population);

    while (newGeneration.length < population.length) {
      const parent1 = GeneticAlgorithm.getRandomElement(selectedNets);
      const parent2 = GeneticAlgorithm.getRandomElement(selectedNets);
      const offspring = GeneticAlgorithm.crossover(parent1, parent2, rayCount);
      newGeneration.push(offspring);
    }
    const mutation_amount = getMutationAmount(
      generation,
      DEFAULT_MUTATION_AMOUNT,
      0.023,
      bestFit
    );
    console.log("MUTATION AMOUNT:", mutation_amount);
    GeneticAlgorithm.mutate(newGeneration, mutation_amount);

    return newGeneration;
  }

  private static selection(population: NeuralNetwork[]): NeuralNetwork[] {
    const sortedPopulation = population.sort((a, b) => b.fitness - a.fitness);

    // Choose the top quarter neural networks as selectedNets
    const selectedNets = sortedPopulation.slice(
      0,
      Math.ceil(sortedPopulation.length / 10)
    );

    return selectedNets;
  }

  private static crossover(
    parent1: NeuralNetwork,
    parent2: NeuralNetwork,
    raycount: number
  ): NeuralNetwork {
    // Perform single-point crossover
    const child = new NeuralNetwork([raycount, 7, 4]);

    const crossoverPoint = Math.floor(Math.random() * parent1.levels!.length);

    for (let i = 0; i < parent1.levels.length; i++) {
      if (i < crossoverPoint) {
        child.levels[i] = JSON.parse(JSON.stringify(parent1.levels[i]));
        child.fitness = parent1.fitness;
      } else {
        child.levels[i] = JSON.parse(JSON.stringify(parent2.levels[i]));
        child.fitness = parent2.fitness;
      }
    }

    return child;
  }

  private static mutate(population: NeuralNetwork[], mutation: number): void {
    for (const neuralNetwork of population) {
      NeuralNetwork.mutate(neuralNetwork, mutation);
    }
  }

  private static getRandomElement<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
}
