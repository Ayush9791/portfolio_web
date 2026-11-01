---
title: "Teaching Neural Networks to Race: Building an F1-Style AI Simulator"
date: "2026-10-31"
summary: "A development log on building a 2D racing simulator where neural-network drivers learn track control through evolutionary training."
tags: ["Python", "Neural Networks", "Genetic Algorithms", "Pygame"]
project: "Formula AI"
status: "published"
---

## The experiment

I wanted to build something that makes machine learning visible. Instead of looking at a training score or a notebook full of metrics, I wanted to watch an agent learn to drive.

The result is a 2D, F1-inspired racing simulator built with Python and Pygame. Each car observes the track through sensors and uses a small neural network to decide how to steer and accelerate.

## Turning a track into inputs

A driver needs enough information to stay on the circuit without being handed the correct action. The current controller receives seven directional track-sensor readings and a normalized speed value.

The network produces two controls:

- Steering, which changes the car's direction.
- Throttle, which controls acceleration.

The important design choice is that the network does not receive a precomputed racing line. It has to learn useful behavior from the observations available to it.

## Learning through evolution

I used a genetic algorithm to train a population of drivers. Each generation is evaluated in the simulator, the stronger candidates are retained, and their parameters are combined and mutated to create the next population.

The fitness function rewards progress around the track and completed laps. Crashes receive a penalty so that simply moving quickly without staying on the circuit is not a good strategy.

This is not reinforcement learning with a value function or policy-gradient update. It is neuroevolution: the network weights are the candidates being evolved.

## What changed during development

The first versions were useful for proving the idea, but scaling the population made rendering expensive. I reduced visual overhead by simplifying car rendering and separating the training objective from purely cosmetic detail.

I also built a replay path for inspecting the saved best driver. That matters because a high fitness score is not enough. Watching a replay exposes behaviors that a single number can hide, including unstable steering and late crashes.

## What I learned

- Sensor design defines what the agent can learn. Missing information cannot be recovered by increasing the population.
- Fitness functions shape behavior, sometimes in unexpected ways. Progress, lap completion, and crash penalties need to work together.
- Training speed is part of the experiment. Rendering every candidate can become the bottleneck before the neural network does.
- A replay tool is essential for debugging learned behavior, not just for making a demo.

## Next steps

The next useful improvements are more robust crash handling, repeatable evaluation across multiple tracks or starting conditions, and clearer generation-level metrics. I also want to move from isolated training runs toward races with multiple cars using the same learned policy.

The goal is not to claim that the cars have mastered racing. It is to build a simulator where each improvement can be observed, measured, and reproduced.
