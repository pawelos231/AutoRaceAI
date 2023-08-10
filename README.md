# Auto Race AI

<p align='center'>
<br>
<i><b>[🚧 Project may receive updates in the future (that are listed below) for better experience🚧]</b></i>
</p>

Welcome to the **Auto Race AI** project repository! This project provides an interactive simulation of machine learning model-trained cars using a neural network. Written in TypeScript and devoid of external libraries, this project is designed to offer a deep exploration into the inner workings of neural networks and genetic algorithms.

## Introduction

The **Auto Race AI** project provides an immersive experience into the world of machine learning and artificial intelligence through an engaging car racing simulation. By adopting TypeScript and without usage of external libraries, I aim to facilitate a comprehensive understanding of the intricate mechanisms behind neural networks and genetic algorithms.

## Neural Network Architecture

At the core of this project lies a sophisticated neural network architecture. Each car is equipped with a three-layered feed-forward neural network. The `sensor.ts` file allows you to effortlessly adjust the number of rays emitted by each car.

## Genetic Algorithm

Genetic algorithm drives the training process, enabling cars to continually enhance their performance across generations. This mechanism incorporates single-point crossover, mutation, and selection strategies, mirroring nature's process of evolution.

## Fitness Calculation

A holistic approach to fitness evaluation underpins the progress of each car. The fitness score is calculated based on four essential factors: the number of crossed obstacles, distance from the center line, car speed, and total distance traveled.

## Simulation Details

A simulation process unfolds with each generation. A group of 250 cars, each equipped with its neural network, is introduced per generation. Progress to the subsequent generation is initiated upon the achievement of a predefined threshold (e.g., -20000) by the best-performing car. The racetrack layout, including 50 randomly positioned cars, is defined in the `data/traffic.ts` file.

## Adjustable Parameters

Tailor the project according to your preferences by adjusting these parameters:

- Modify the number of rays emitted by each car in the `sensor.ts` file.
- Customize the track layout and obstacle positions in the `data/traffic.ts` file.
- Define the advancement threshold for generation progression (e.g., -20000).

## Future Development Plans

In the future i plan to add on these new features to expand on the ones i already have for better user experience.

- Diverse Training Environments

- Improved User Interface

- Playable Mode: Enable users to test their skills by racing against the trained AI model.

- Advanced Obstacles: Incorporate curved paths and stationary obstacles to simulate real-world driving challenges

## Usage

To dive into the **Auto Race AI** project, follow these steps:

Execute the following commands to install dependencies and run the simulation:

```bash
npm install
parcel ./index.html
tsc -w
```

here is a video of a nicely trained cars:

https://github.com/pawelos231/AutoRaceAI/assets/93586648/e6b998fd-5840-4fe3-b90e-c511a10c22ca



