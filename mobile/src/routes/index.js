import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '~/pages/SignIn';

import Profile from '~/pages/Profile';
import Dashboard from '~/pages/Dashboard';

export default (signed = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            Dashboard,
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7d40e7',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
                height: 70,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signed ? 'App' : 'SignIn',
      }
    )
  );
