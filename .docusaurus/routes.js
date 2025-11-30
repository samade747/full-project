import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/ur/login',
    component: ComponentCreator('/ur/login', '52e'),
    exact: true
  },
  {
    path: '/ur/signup',
    component: ComponentCreator('/ur/signup', '64a'),
    exact: true
  },
  {
    path: '/ur/docs',
    component: ComponentCreator('/ur/docs', '851'),
    routes: [
      {
        path: '/ur/docs',
        component: ComponentCreator('/ur/docs', '0f4'),
        routes: [
          {
            path: '/ur/docs',
            component: ComponentCreator('/ur/docs', 'e2c'),
            routes: [
              {
                path: '/ur/docs/category/2-ros-2-robot-operating-system',
                component: ComponentCreator('/ur/docs/category/2-ros-2-robot-operating-system', '8b8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/category/3-robot-simulation',
                component: ComponentCreator('/ur/docs/category/3-robot-simulation', '81e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/category/5-vision-language-action-vla',
                component: ComponentCreator('/ur/docs/category/5-vision-language-action-vla', '9e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/category/6-humanoid-robotics',
                component: ComponentCreator('/ur/docs/category/6-humanoid-robotics', 'bda'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/category/7-hardware-setup',
                component: ComponentCreator('/ur/docs/category/7-hardware-setup', '7b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/category/physical-ai',
                component: ComponentCreator('/ur/docs/category/physical-ai', '085'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/hardware/',
                component: ComponentCreator('/ur/docs/hardware/', 'e2d'),
                exact: true
              },
              {
                path: '/ur/docs/hardware/conclusion/',
                component: ComponentCreator('/ur/docs/hardware/conclusion/', '567'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/hardware/edge-computing-jetson',
                component: ComponentCreator('/ur/docs/hardware/edge-computing-jetson', 'd1d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/hardware/introduction/',
                component: ComponentCreator('/ur/docs/hardware/introduction/', '8b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/hardware/lab-infrastructure',
                component: ComponentCreator('/ur/docs/hardware/lab-infrastructure', '97f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/hardware/sensors-actuators',
                component: ComponentCreator('/ur/docs/hardware/sensors-actuators', '837'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/hardware/workstation-requirements',
                component: ComponentCreator('/ur/docs/hardware/workstation-requirements', 'a63'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/humanoid-robotics/',
                component: ComponentCreator('/ur/docs/humanoid-robotics/', '7dd'),
                exact: true
              },
              {
                path: '/ur/docs/humanoid-robotics/bipedal-locomotion',
                component: ComponentCreator('/ur/docs/humanoid-robotics/bipedal-locomotion', 'b5f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/humanoid-robotics/conclusion/',
                component: ComponentCreator('/ur/docs/humanoid-robotics/conclusion/', '56a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/humanoid-robotics/human-robot-interaction',
                component: ComponentCreator('/ur/docs/humanoid-robotics/human-robot-interaction', '0b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/humanoid-robotics/introduction/',
                component: ComponentCreator('/ur/docs/humanoid-robotics/introduction/', '796'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/humanoid-robotics/kinematics-dynamics',
                component: ComponentCreator('/ur/docs/humanoid-robotics/kinematics-dynamics', '94b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/humanoid-robotics/manipulation-grasping',
                component: ComponentCreator('/ur/docs/humanoid-robotics/manipulation-grasping', '05e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/intro',
                component: ComponentCreator('/ur/docs/intro', '8a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/physical-ai/',
                component: ComponentCreator('/ur/docs/physical-ai/', '92a'),
                exact: true
              },
              {
                path: '/ur/docs/physical-ai/conclusion/',
                component: ComponentCreator('/ur/docs/physical-ai/conclusion/', '66f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/physical-ai/core-principles/',
                component: ComponentCreator('/ur/docs/physical-ai/core-principles/', '36f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/physical-ai/digital-to-physical-transition/',
                component: ComponentCreator('/ur/docs/physical-ai/digital-to-physical-transition/', 'f09'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/physical-ai/introduction/',
                component: ComponentCreator('/ur/docs/physical-ai/introduction/', 'f98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/ros2/',
                component: ComponentCreator('/ur/docs/ros2/', '5f3'),
                exact: true
              },
              {
                path: '/ur/docs/ros2/communication-patterns/',
                component: ComponentCreator('/ur/docs/ros2/communication-patterns/', '7d0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/ros2/conclusion/',
                component: ComponentCreator('/ur/docs/ros2/conclusion/', 'eea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/ros2/core-architecture/',
                component: ComponentCreator('/ur/docs/ros2/core-architecture/', 'a2f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/ros2/introduction/',
                component: ComponentCreator('/ur/docs/ros2/introduction/', '2c6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/ros2/python-integration-rclpy/',
                component: ComponentCreator('/ur/docs/ros2/python-integration-rclpy/', '230'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/ros2/urdf/',
                component: ComponentCreator('/ur/docs/ros2/urdf/', '0f9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/simulation/',
                component: ComponentCreator('/ur/docs/simulation/', '458'),
                exact: true
              },
              {
                path: '/ur/docs/simulation/conclusion/',
                component: ComponentCreator('/ur/docs/simulation/conclusion/', '302'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/simulation/introduction/',
                component: ComponentCreator('/ur/docs/simulation/introduction/', '7c8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/simulation/platforms/',
                component: ComponentCreator('/ur/docs/simulation/platforms/', 'a0a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/simulation/sensor-simulation/',
                component: ComponentCreator('/ur/docs/simulation/sensor-simulation/', '413'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/vla/',
                component: ComponentCreator('/ur/docs/vla/', 'db0'),
                exact: true
              },
              {
                path: '/ur/docs/vla/conclusion/',
                component: ComponentCreator('/ur/docs/vla/conclusion/', '9cc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/vla/introduction/',
                component: ComponentCreator('/ur/docs/vla/introduction/', '60d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/vla/llm-role',
                component: ComponentCreator('/ur/docs/vla/llm-role', '7ca'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/ur/docs/vla/pipeline',
                component: ComponentCreator('/ur/docs/vla/pipeline', '03c'),
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
    path: '/ur/',
    component: ComponentCreator('/ur/', 'f17'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
