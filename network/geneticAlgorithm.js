import { NeuralNetwork } from "./index";
import { DEFAULT_MUTATION_AMOUNT } from "../constants/DefaultValues/neuralNetworkConsts";
function getMutationAmount(currentGeneration, initialMutationAmount, decayRate, bestFitness) {
    const mutationAmount = initialMutationAmount /
        (1 + decayRate * currentGeneration) /
        (1 + bestFitness);
    const minMutationAmount = 0.01;
    return Math.max(mutationAmount, minMutationAmount);
}
export class GeneticAlgorithm {
    static trainNeuralNetworks(cars, population, traffic) {
        for (let i = 0; i < cars.length; i++) {
            const fitness = cars[i].calculateFitness(traffic);
            cars[i].brain.fitness = fitness || 0;
            population[i] = cars[i].brain;
        }
    }
    static evolvePopulation(population, rayCount, generation, bestFit) {
        const newGeneration = [];
        const selectedNets = GeneticAlgorithm.selection(population);
        while (newGeneration.length < population.length) {
            const parent1 = GeneticAlgorithm.getRandomElement(selectedNets);
            const parent2 = GeneticAlgorithm.getRandomElement(selectedNets);
            const offspring = GeneticAlgorithm.crossover(parent1, parent2, rayCount);
            newGeneration.push(offspring);
        }
        const mutation_amount = getMutationAmount(generation, DEFAULT_MUTATION_AMOUNT, 0.016, bestFit);
        console.log("MUTATION AMOUNT:", mutation_amount);
        GeneticAlgorithm.mutate(newGeneration, mutation_amount);
        return newGeneration;
    }
    static selection(population) {
        const sortedPopulation = population.sort((a, b) => b.fitness - a.fitness);
        // Choose the top 10% neural networks as selectedNets
        const selectedNets = sortedPopulation.slice(0, Math.ceil(sortedPopulation.length / 10));
        console.log(selectedNets);
        return selectedNets;
    }
    static crossover(parent1, parent2, raycount) {
        // Perform single-point crossover
        const child = new NeuralNetwork([raycount, 7, 4]);
        const crossoverPoint = Math.floor(Math.random() * parent1.levels.length);
        for (let i = 0; i < parent1.levels.length; i++) {
            if (i < crossoverPoint) {
                child.levels[i] = JSON.parse(JSON.stringify(parent1.levels[i]));
                child.fitness = parent1.fitness;
            }
            else {
                child.levels[i] = JSON.parse(JSON.stringify(parent2.levels[i]));
                child.fitness = parent2.fitness;
            }
        }
        return child;
    }
    static mutate(population, mutation) {
        for (const neuralNetwork of population) {
            NeuralNetwork.mutate(neuralNetwork, mutation);
        }
    }
    static getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
}
