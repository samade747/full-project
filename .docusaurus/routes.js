import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/full-project/login',
    component: ComponentCreator('/full-project/login', 'e30'),
    exact: true
  },
  {
    path: '/full-project/signup',
    component: ComponentCreator('/full-project/signup', '19b'),
    exact: true
  },
  {
    path: '/full-project/docs',
    component: ComponentCreator('/full-project/docs', 'fad'),
    routes: [
      {
        path: '/full-project/docs',
        component: ComponentCreator('/full-project/docs', '76a'),
        routes: [
          {
            path: '/full-project/docs',
            component: ComponentCreator('/full-project/docs', '19c'),
            routes: [
              {
                path: '/full-project/docs/category/2-ros-2-robot-operating-system',
                component: ComponentCreator('/full-project/docs/category/2-ros-2-robot-operating-system', '695'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/category/3-robot-simulation',
                component: ComponentCreator('/full-project/docs/category/3-robot-simulation', '100'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/category/5-vision-language-action-vla',
                component: ComponentCreator('/full-project/docs/category/5-vision-language-action-vla', '456'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/category/6-humanoid-robotics',
                component: ComponentCreator('/full-project/docs/category/6-humanoid-robotics', '2c4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/category/7-hardware-setup',
                component: ComponentCreator('/full-project/docs/category/7-hardware-setup', '62c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/category/physical-ai',
                component: ComponentCreator('/full-project/docs/category/physical-ai', '0bd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/hardware/',
                component: ComponentCreator('/full-project/docs/hardware/', 'f93'),
                exact: true
              },
              {
                path: '/full-project/docs/hardware/conclusion/',
                component: ComponentCreator('/full-project/docs/hardware/conclusion/', '83b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/hardware/edge-computing-jetson',
                component: ComponentCreator('/full-project/docs/hardware/edge-computing-jetson', '1ac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/hardware/introduction/',
                component: ComponentCreator('/full-project/docs/hardware/introduction/', 'bf6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/hardware/lab-infrastructure',
                component: ComponentCreator('/full-project/docs/hardware/lab-infrastructure', '2f1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/hardware/sensors-actuators',
                component: ComponentCreator('/full-project/docs/hardware/sensors-actuators', '670'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/hardware/workstation-requirements',
                component: ComponentCreator('/full-project/docs/hardware/workstation-requirements', 'a5a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/humanoid-robotics/',
                component: ComponentCreator('/full-project/docs/humanoid-robotics/', '40b'),
                exact: true
              },
              {
                path: '/full-project/docs/humanoid-robotics/bipedal-locomotion',
                component: ComponentCreator('/full-project/docs/humanoid-robotics/bipedal-locomotion', '58c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/humanoid-robotics/conclusion/',
                component: ComponentCreator('/full-project/docs/humanoid-robotics/conclusion/', '3d2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/humanoid-robotics/human-robot-interaction',
                component: ComponentCreator('/full-project/docs/humanoid-robotics/human-robot-interaction', 'f86'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/humanoid-robotics/introduction/',
                component: ComponentCreator('/full-project/docs/humanoid-robotics/introduction/', 'bcb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/humanoid-robotics/kinematics-dynamics',
                component: ComponentCreator('/full-project/docs/humanoid-robotics/kinematics-dynamics', 'c8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/humanoid-robotics/manipulation-grasping',
                component: ComponentCreator('/full-project/docs/humanoid-robotics/manipulation-grasping', '9c7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/intro',
                component: ComponentCreator('/full-project/docs/intro', '12e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/physical-ai/',
                component: ComponentCreator('/full-project/docs/physical-ai/', '934'),
                exact: true
              },
              {
                path: '/full-project/docs/physical-ai/conclusion/',
                component: ComponentCreator('/full-project/docs/physical-ai/conclusion/', '6cb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/physical-ai/core-principles/',
                component: ComponentCreator('/full-project/docs/physical-ai/core-principles/', '74e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/physical-ai/digital-to-physical-transition/',
                component: ComponentCreator('/full-project/docs/physical-ai/digital-to-physical-transition/', 'abb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/physical-ai/introduction/',
                component: ComponentCreator('/full-project/docs/physical-ai/introduction/', '342'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/ros2/',
                component: ComponentCreator('/full-project/docs/ros2/', '224'),
                exact: true
              },
              {
                path: '/full-project/docs/ros2/communication-patterns/',
                component: ComponentCreator('/full-project/docs/ros2/communication-patterns/', '017'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/ros2/conclusion/',
                component: ComponentCreator('/full-project/docs/ros2/conclusion/', 'c48'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/ros2/core-architecture/',
                component: ComponentCreator('/full-project/docs/ros2/core-architecture/', '31b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/ros2/introduction/',
                component: ComponentCreator('/full-project/docs/ros2/introduction/', '4ee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/ros2/python-integration-rclpy/',
                component: ComponentCreator('/full-project/docs/ros2/python-integration-rclpy/', 'ae8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/ros2/urdf/',
                component: ComponentCreator('/full-project/docs/ros2/urdf/', '73b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/simulation/',
                component: ComponentCreator('/full-project/docs/simulation/', 'f93'),
                exact: true
              },
              {
                path: '/full-project/docs/simulation/conclusion/',
                component: ComponentCreator('/full-project/docs/simulation/conclusion/', '4ac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/simulation/introduction/',
                component: ComponentCreator('/full-project/docs/simulation/introduction/', 'a81'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/simulation/platforms/',
                component: ComponentCreator('/full-project/docs/simulation/platforms/', 'cb7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/simulation/sensor-simulation/',
                component: ComponentCreator('/full-project/docs/simulation/sensor-simulation/', '7a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/vla/',
                component: ComponentCreator('/full-project/docs/vla/', '2c7'),
                exact: true
              },
              {
                path: '/full-project/docs/vla/conclusion/',
                component: ComponentCreator('/full-project/docs/vla/conclusion/', '6a5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/vla/introduction/',
                component: ComponentCreator('/full-project/docs/vla/introduction/', '75e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/vla/llm-role',
                component: ComponentCreator('/full-project/docs/vla/llm-role', '8bc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/docs/vla/pipeline',
                component: ComponentCreator('/full-project/docs/vla/pipeline', '1e4'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/full-project/',
    component: ComponentCreator('/full-project/', '330'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
