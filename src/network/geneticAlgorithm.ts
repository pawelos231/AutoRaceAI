import { NeuralNetwork } from "./index";
import { Border } from "../types/RoadTypes";
import { Car } from "../modules/entities/Car";
import {
  CAR_Y_POS,
  CAR_HEIGHT,
  CAR_WIDTH,
  CAR_X_POX,
} from "../constants/DefaultValues/EntitiesDimmensions";
import { VehicleType } from "../types/CarTypes";
import { VehicleSpeed } from "../types/CarTypes";
import { Road } from "../modules/entities/Road";

export class GeneticAlgorithm {
  static trainNeuralNetworks(
    population: NeuralNetwork[],
    roadBorders: Border[][],
    traffic: Car[],
    road: Road
  ) {
    // Implement the method to train the neural networks in the population using the genetic algorithm.
    // Evaluate the performance of each neural network (car), assign fitness scores, and update the neural networks.
    for (const neuralNetwork of population) {
      const car = new Car(
        road.getLaneCenter(1),
        CAR_Y_POS,
        CAR_WIDTH,
        CAR_HEIGHT,
        VehicleType.AI,
        VehicleSpeed.AVERAGE,
        road.getLaneCenter.bind(road),
        road.laneCount
      );
      car.brain = neuralNetwork;
      car.update(roadBorders, traffic);
      const fitness = car.calculateFitness();
      console.log(fitness);
      if (fitness) {
        neuralNetwork.setFit = Number(fitness);
      } else {
        throw new Error("error setting fitness");
      }
    }
  }

  public static EvolvePopulation(population: NeuralNetwork[]): NeuralNetwork[] {
    const newGeneration: NeuralNetwork[] = [];

    // Selection: Choose the best-performing neural networks for reproduction.
    const selectedNets = GeneticAlgorithm.selection(population);

    // Crossover: Perform crossover to create new offspring neural networks.
    while (newGeneration.length < population.length) {
      const parent1 = GeneticAlgorithm.getRandomElement(selectedNets);
      const parent2 = GeneticAlgorithm.getRandomElement(selectedNets);
      const offspring = GeneticAlgorithm.crossover(parent1, parent2);
      newGeneration.push(offspring);
    }
    GeneticAlgorithm.mutate(newGeneration);

    return newGeneration;
  }

  private static selection(population: NeuralNetwork[]): NeuralNetwork[] {
    // You can implement various selection techniques here, such as
    // tournament selection, roulette wheel selection, or rank-based selection.
    // Choose the best-performing neural networks based on their fitness scores.
    // Return an array of selected neural networks.
  }

  // Helper function: Perform crossover to create offspring neural networks.
  private static crossover(
    parent1: NeuralNetwork,
    parent2: NeuralNetwork
  ): NeuralNetwork {
    // Implement the crossover operation here, either single-point or uniform crossover.
    // Return a new neural network (offspring) created from the parents.
  }

  // Helper function: Apply mutation to introduce small random changes in neural networks.
  private static mutate(population: NeuralNetwork[]): void {
    // Implement the mutation operation here.
    // Iterate through each neural network in the population and apply mutation.
    // Mutation can involve changing random weights or biases in the neural network.
  }

  // Helper function: Get a random element from an array.
  private static getRandomElement<T>(arr: T[]): T {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
}
