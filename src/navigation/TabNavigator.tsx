import React from 'react';
import { Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/Home/HomeScreen';
import CookScreen from '../screens/Cook/CookScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

import homeIcon from '../assets/home.png';
import cookingIcon from '../assets/cooking.png';
import settingsIcon from '../assets/setting.png';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: 10 + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#FF6B6B' : '#999',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cook"
        component={CookScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={cookingIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#FF6B6B' : '#999',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={settingsIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#FF6B6B' : '#999',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
