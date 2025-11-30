---
title: Sim-to-Real Transfer
---

# Sim-to-Real Transfer

One of the ultimate goals of robotics simulation is to be able to transfer the knowledge gained in simulation to a real robot. This is known as sim-to-real transfer. The NVIDIA Isaac platform provides several tools and workflows to facilitate this process.

## Isaac Lab

Isaac Lab is a framework built on top of Isaac Sim that is specifically designed for robotics research, with a strong focus on reinforcement learning and sim-to-real transfer. It provides a set of reinforcement learning environments, a library of robot models, and a set of utilities for training and evaluating policies.

## Teacher-Student Distillation

A common workflow for sim-to-real transfer is teacher-student distillation.

1.  **Train a "teacher" policy** in simulation with access to privileged information (e.g., the ground truth state of the robot and the environment).
2.  **Train a "student" policy** to mimic the teacher policy using only realistic sensor data that would be available on a real robot.
3.  **Deploy the student policy** on the real robot.

This approach allows the robot to learn from the "perfect" information available in simulation and then transfer that knowledge to the real world.
