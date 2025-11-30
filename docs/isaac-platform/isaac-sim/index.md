---
title: Isaac Sim
---

# Isaac Sim

NVIDIA Isaac Sim is a robotics simulation platform built on top of NVIDIA Omniverse. It leverages the power of NVIDIA's RTX technology to create stunningly realistic and physically accurate virtual worlds for training and testing robots.

## Synthetic Data Generation

One of the key features of Isaac Sim is its ability to generate large-scale, high-quality synthetic datasets for training AI models. This is crucial for robotics, as collecting and labeling real-world data can be a time-consuming and expensive process.

-   **Replicator Composer**: Isaac Sim includes a powerful tool called Replicator Composer that allows developers to create and manage synthetic data generation pipelines. With Replicator Composer, you can procedurally generate a wide variety of environments, objects, and scenarios to create diverse and comprehensive datasets.
-   **Domain Randomization**: To improve the robustness of AI models trained on synthetic data, Isaac Sim supports domain randomization. This involves randomly varying the parameters of the simulation, such as lighting, textures, and camera angles, to expose the model to a wide range of conditions.

## Realistic Simulation

Isaac Sim provides a physically accurate simulation of robots and their environments.

-   **PhysX**: It uses NVIDIA's PhysX 5.0 for physics simulation, which can accurately model rigid bodies, soft bodies, and fluids.
-   **Sensor Models**: Isaac Sim includes a wide range of sensor models, including cameras, LiDAR, radar, and IMUs. These models can be configured to match the specifications of real-world sensors.
-   **Robot Models**: Isaac Sim supports importing robot models in URDF and MJCF formats. It also includes a growing library of pre-built robot models from leading manufacturers.
