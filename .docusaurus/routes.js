import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/physical-ai-textbook/__docusaurus/debug',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug', '1b0'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/config',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/config', '4ef'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/content',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/content', '02c'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/globalData',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/globalData', '58f'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/metadata',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/metadata', '647'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/registry',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/registry', '125'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/__docusaurus/debug/routes',
    component: ComponentCreator('/physical-ai-textbook/__docusaurus/debug/routes', 'aa1'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/login',
    component: ComponentCreator('/physical-ai-textbook/login', 'c2e'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/signup',
    component: ComponentCreator('/physical-ai-textbook/signup', '1fd'),
    exact: true
  },
  {
    path: '/physical-ai-textbook/docs',
    component: ComponentCreator('/physical-ai-textbook/docs', '168'),
    routes: [
      {
        path: '/physical-ai-textbook/docs',
        component: ComponentCreator('/physical-ai-textbook/docs', '8cc'),
        routes: [
          {
            path: '/physical-ai-textbook/docs',
            component: ComponentCreator('/physical-ai-textbook/docs', 'ba4'),
            routes: [
              {
                path: '/physical-ai-textbook/docs/category/2-ros-2-robot-operating-system',
                component: ComponentCreator('/physical-ai-textbook/docs/category/2-ros-2-robot-operating-system', 'a8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/category/3-robot-simulation',
                component: ComponentCreator('/physical-ai-textbook/docs/category/3-robot-simulation', '629'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/category/5-vision-language-action-vla',
                component: ComponentCreator('/physical-ai-textbook/docs/category/5-vision-language-action-vla', '409'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/category/6-humanoid-robotics',
                component: ComponentCreator('/physical-ai-textbook/docs/category/6-humanoid-robotics', '93d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/category/7-hardware-setup',
                component: ComponentCreator('/physical-ai-textbook/docs/category/7-hardware-setup', '8ef'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/category/physical-ai',
                component: ComponentCreator('/physical-ai-textbook/docs/category/physical-ai', '4e4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/hardware/',
                component: ComponentCreator('/physical-ai-textbook/docs/hardware/', 'd31'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/docs/hardware/conclusion/',
                component: ComponentCreator('/physical-ai-textbook/docs/hardware/conclusion/', 'ba8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/hardware/edge-computing-jetson',
                component: ComponentCreator('/physical-ai-textbook/docs/hardware/edge-computing-jetson', '847'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/hardware/introduction/',
                component: ComponentCreator('/physical-ai-textbook/docs/hardware/introduction/', 'e82'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/hardware/lab-infrastructure',
                component: ComponentCreator('/physical-ai-textbook/docs/hardware/lab-infrastructure', '7a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/hardware/sensors-actuators',
                component: ComponentCreator('/physical-ai-textbook/docs/hardware/sensors-actuators', 'e81'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/hardware/workstation-requirements',
                component: ComponentCreator('/physical-ai-textbook/docs/hardware/workstation-requirements', '7ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/humanoid-robotics/',
                component: ComponentCreator('/physical-ai-textbook/docs/humanoid-robotics/', '2d2'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/docs/humanoid-robotics/bipedal-locomotion',
                component: ComponentCreator('/physical-ai-textbook/docs/humanoid-robotics/bipedal-locomotion', 'e63'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/humanoid-robotics/conclusion/',
                component: ComponentCreator('/physical-ai-textbook/docs/humanoid-robotics/conclusion/', 'b95'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/humanoid-robotics/human-robot-interaction',
                component: ComponentCreator('/physical-ai-textbook/docs/humanoid-robotics/human-robot-interaction', '4b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/humanoid-robotics/introduction/',
                component: ComponentCreator('/physical-ai-textbook/docs/humanoid-robotics/introduction/', '88d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/humanoid-robotics/kinematics-dynamics',
                component: ComponentCreator('/physical-ai-textbook/docs/humanoid-robotics/kinematics-dynamics', '013'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/humanoid-robotics/manipulation-grasping',
                component: ComponentCreator('/physical-ai-textbook/docs/humanoid-robotics/manipulation-grasping', 'd24'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/intro',
                component: ComponentCreator('/physical-ai-textbook/docs/intro', '14c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/physical-ai/',
                component: ComponentCreator('/physical-ai-textbook/docs/physical-ai/', '6c4'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/docs/physical-ai/conclusion/',
                component: ComponentCreator('/physical-ai-textbook/docs/physical-ai/conclusion/', '4be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/physical-ai/core-principles/',
                component: ComponentCreator('/physical-ai-textbook/docs/physical-ai/core-principles/', 'c11'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/physical-ai/digital-to-physical-transition/',
                component: ComponentCreator('/physical-ai-textbook/docs/physical-ai/digital-to-physical-transition/', 'f7b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/physical-ai/introduction/',
                component: ComponentCreator('/physical-ai-textbook/docs/physical-ai/introduction/', '863'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/ros2/',
                component: ComponentCreator('/physical-ai-textbook/docs/ros2/', 'f18'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/docs/ros2/communication-patterns/',
                component: ComponentCreator('/physical-ai-textbook/docs/ros2/communication-patterns/', '44e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/ros2/conclusion/',
                component: ComponentCreator('/physical-ai-textbook/docs/ros2/conclusion/', 'f88'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/ros2/core-architecture/',
                component: ComponentCreator('/physical-ai-textbook/docs/ros2/core-architecture/', '778'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/ros2/introduction/',
                component: ComponentCreator('/physical-ai-textbook/docs/ros2/introduction/', '0d3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/ros2/python-integration-rclpy/',
                component: ComponentCreator('/physical-ai-textbook/docs/ros2/python-integration-rclpy/', '7fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/ros2/urdf/',
                component: ComponentCreator('/physical-ai-textbook/docs/ros2/urdf/', '1ee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/simulation/',
                component: ComponentCreator('/physical-ai-textbook/docs/simulation/', '741'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/docs/simulation/conclusion/',
                component: ComponentCreator('/physical-ai-textbook/docs/simulation/conclusion/', '960'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/simulation/introduction/',
                component: ComponentCreator('/physical-ai-textbook/docs/simulation/introduction/', 'df7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/simulation/platforms/',
                component: ComponentCreator('/physical-ai-textbook/docs/simulation/platforms/', '3fc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/simulation/sensor-simulation/',
                component: ComponentCreator('/physical-ai-textbook/docs/simulation/sensor-simulation/', 'd58'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/vla/',
                component: ComponentCreator('/physical-ai-textbook/docs/vla/', 'fb1'),
                exact: true
              },
              {
                path: '/physical-ai-textbook/docs/vla/conclusion/',
                component: ComponentCreator('/physical-ai-textbook/docs/vla/conclusion/', '440'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/vla/introduction/',
                component: ComponentCreator('/physical-ai-textbook/docs/vla/introduction/', '61a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/vla/llm-role',
                component: ComponentCreator('/physical-ai-textbook/docs/vla/llm-role', 'c69'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/physical-ai-textbook/docs/vla/pipeline',
                component: ComponentCreator('/physical-ai-textbook/docs/vla/pipeline', '5e3'),
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
    path: '/physical-ai-textbook/',
    component: ComponentCreator('/physical-ai-textbook/', '94f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
