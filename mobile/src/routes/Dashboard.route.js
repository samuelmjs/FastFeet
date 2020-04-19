import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Profile from '~/pages/Profile';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
