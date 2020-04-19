import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '~/pages/SignIn';

import Profile from '~/pages/Profile';

import Delivery from '~/pages/Dashboard';
import DeliveryDetail from '~/pages/DeliveryDetails';
import DeliveryOrder from '~/pages/DeliveryDetails/DeliveryOrder';
import DeliveryReportProblem from '~/pages/DeliveryDetails/ReportProblem';
import DeliveryViewProblems from '~/pages/DeliveryDetails/ViewProblems';

export default (signed = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            Dashboard: createStackNavigator(
              {
                Delivery: {
                  screen: Delivery,
                  navigationOptions: {
                    headerTransparent: true,
                  },
                },
                DeliveryDetail,
                DeliveryOrder,
                DeliveryReportProblem,
                DeliveryViewProblems,
              },
              {
                defaultNavigationOptions: {
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  headerStyle: {
                    shadowColor: 'transparent',
                    backgroundColor: '#7d40e7',
                    borderWidth: 0,
                    borderColor: '#7d40e7',
                  },
                  headerTintColor: '#fff',
                  headerBackTitleVisible: false,
                  headerLeftContainerStyle: {
                    left: 10,
                  },
                },

                navigationOptions: {
                  tabBarLabel: ({ tintColor }) => (
                    <View
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: tintColor,
                          textAlign: 'center',
                        }}
                      >
                        Entrega
                      </Text>
                    </View>
                  ),
                  tabBarIcon: ({ tintColor }) => (
                    <MaterialIcons name="reorder" size={24} color={tintColor} />
                  ),
                },
              }
            ),
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
