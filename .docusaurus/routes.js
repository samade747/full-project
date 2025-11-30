import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/full-project/ur/login',
    component: ComponentCreator('/full-project/ur/login', 'a6f'),
    exact: true
  },
  {
    path: '/full-project/ur/signup',
    component: ComponentCreator('/full-project/ur/signup', '502'),
    exact: true
  },
  {
    path: '/full-project/ur/docs',
    component: ComponentCreator('/full-project/ur/docs', 'ff8'),
    routes: [
      {
        path: '/full-project/ur/docs',
        component: ComponentCreator('/full-project/ur/docs', '656'),
        routes: [
          {
            path: '/full-project/ur/docs',
            component: ComponentCreator('/full-project/ur/docs', 'b18'),
            routes: [
              {
                path: '/full-project/ur/docs/category/2-ros-2-robot-operating-system',
                component: ComponentCreator('/full-project/ur/docs/category/2-ros-2-robot-operating-system', 'e4c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/category/3-robot-simulation',
                component: ComponentCreator('/full-project/ur/docs/category/3-robot-simulation', '37d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/category/5-vision-language-action-vla',
                component: ComponentCreator('/full-project/ur/docs/category/5-vision-language-action-vla', '056'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/category/6-humanoid-robotics',
                component: ComponentCreator('/full-project/ur/docs/category/6-humanoid-robotics', '33a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/category/7-hardware-setup',
                component: ComponentCreator('/full-project/ur/docs/category/7-hardware-setup', 'f19'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/category/physical-ai',
                component: ComponentCreator('/full-project/ur/docs/category/physical-ai', 'f87'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/hardware/',
                component: ComponentCreator('/full-project/ur/docs/hardware/', 'ef7'),
                exact: true
              },
              {
                path: '/full-project/ur/docs/hardware/conclusion/',
                component: ComponentCreator('/full-project/ur/docs/hardware/conclusion/', 'bff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/hardware/edge-computing-jetson',
                component: ComponentCreator('/full-project/ur/docs/hardware/edge-computing-jetson', 'ae4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/hardware/introduction/',
                component: ComponentCreator('/full-project/ur/docs/hardware/introduction/', '5cd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/hardware/lab-infrastructure',
                component: ComponentCreator('/full-project/ur/docs/hardware/lab-infrastructure', '7fb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/hardware/sensors-actuators',
                component: ComponentCreator('/full-project/ur/docs/hardware/sensors-actuators', '55e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/hardware/workstation-requirements',
                component: ComponentCreator('/full-project/ur/docs/hardware/workstation-requirements', '150'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/humanoid-robotics/',
                component: ComponentCreator('/full-project/ur/docs/humanoid-robotics/', '4fa'),
                exact: true
              },
              {
                path: '/full-project/ur/docs/humanoid-robotics/bipedal-locomotion',
                component: ComponentCreator('/full-project/ur/docs/humanoid-robotics/bipedal-locomotion', '3a8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/humanoid-robotics/conclusion/',
                component: ComponentCreator('/full-project/ur/docs/humanoid-robotics/conclusion/', 'ec1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/humanoid-robotics/human-robot-interaction',
                component: ComponentCreator('/full-project/ur/docs/humanoid-robotics/human-robot-interaction', '977'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/humanoid-robotics/introduction/',
                component: ComponentCreator('/full-project/ur/docs/humanoid-robotics/introduction/', 'ee9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/humanoid-robotics/kinematics-dynamics',
                component: ComponentCreator('/full-project/ur/docs/humanoid-robotics/kinematics-dynamics', '119'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/humanoid-robotics/manipulation-grasping',
                component: ComponentCreator('/full-project/ur/docs/humanoid-robotics/manipulation-grasping', 'a68'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/intro',
                component: ComponentCreator('/full-project/ur/docs/intro', '353'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/physical-ai/',
                component: ComponentCreator('/full-project/ur/docs/physical-ai/', '5c8'),
                exact: true
              },
              {
                path: '/full-project/ur/docs/physical-ai/conclusion/',
                component: ComponentCreator('/full-project/ur/docs/physical-ai/conclusion/', '5ba'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/physical-ai/core-principles/',
                component: ComponentCreator('/full-project/ur/docs/physical-ai/core-principles/', 'e47'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/physical-ai/digital-to-physical-transition/',
                component: ComponentCreator('/full-project/ur/docs/physical-ai/digital-to-physical-transition/', 'c55'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/physical-ai/introduction/',
                component: ComponentCreator('/full-project/ur/docs/physical-ai/introduction/', '68d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/ros2/',
                component: ComponentCreator('/full-project/ur/docs/ros2/', '7a8'),
                exact: true
              },
              {
                path: '/full-project/ur/docs/ros2/communication-patterns/',
                component: ComponentCreator('/full-project/ur/docs/ros2/communication-patterns/', '353'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/ros2/conclusion/',
                component: ComponentCreator('/full-project/ur/docs/ros2/conclusion/', 'e93'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/ros2/core-architecture/',
                component: ComponentCreator('/full-project/ur/docs/ros2/core-architecture/', 'f90'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/ros2/introduction/',
                component: ComponentCreator('/full-project/ur/docs/ros2/introduction/', '0ae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/ros2/python-integration-rclpy/',
                component: ComponentCreator('/full-project/ur/docs/ros2/python-integration-rclpy/', '873'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/ros2/urdf/',
                component: ComponentCreator('/full-project/ur/docs/ros2/urdf/', 'e61'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/simulation/',
                component: ComponentCreator('/full-project/ur/docs/simulation/', '9ee'),
                exact: true
              },
              {
                path: '/full-project/ur/docs/simulation/conclusion/',
                component: ComponentCreator('/full-project/ur/docs/simulation/conclusion/', 'e03'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/simulation/introduction/',
                component: ComponentCreator('/full-project/ur/docs/simulation/introduction/', '8e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/simulation/platforms/',
                component: ComponentCreator('/full-project/ur/docs/simulation/platforms/', '814'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/simulation/sensor-simulation/',
                component: ComponentCreator('/full-project/ur/docs/simulation/sensor-simulation/', 'eea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/vla/',
                component: ComponentCreator('/full-project/ur/docs/vla/', '9c4'),
                exact: true
              },
              {
                path: '/full-project/ur/docs/vla/conclusion/',
                component: ComponentCreator('/full-project/ur/docs/vla/conclusion/', 'caf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/vla/introduction/',
                component: ComponentCreator('/full-project/ur/docs/vla/introduction/', '58c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/vla/llm-role',
                component: ComponentCreator('/full-project/ur/docs/vla/llm-role', 'b6a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/full-project/ur/docs/vla/pipeline',
                component: ComponentCreator('/full-project/ur/docs/vla/pipeline', 'd49'),
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
    path: '/full-project/ur/',
    component: ComponentCreator('/full-project/ur/', 'aef'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
