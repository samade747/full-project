---
title: Isaac ROS
---

# Isaac ROS

Isaac ROS is a collection of GPU-accelerated ROS 2 packages that provide a significant performance boost for common robotics tasks. These packages are designed to be a drop-in replacement for their standard ROS 2 counterparts, making it easy to accelerate existing ROS 2 applications.

## Perception

Isaac ROS provides a suite of packages for robot perception, including:

-   **Visual SLAM**: A high-performance package for visual simultaneous localization and mapping (VSLAM) that uses stereo cameras and an IMU to estimate the robot's pose and build a map of the environment.
-   **Depth Estimation**: A package for estimating depth from a stereo camera pair.
-   **Object Detection**: A package for detecting and localizing objects in an image using a trained deep neural network.

## Navigation

Isaac ROS also includes packages for robot navigation:

-   **Proximity Segmentation**: A package for segmenting a point cloud into ground and non-ground points, which is useful for obstacle detection.
-   **AprilTag Navigation**: A package for navigating using AprilTags, which are visual fiducial markers.
