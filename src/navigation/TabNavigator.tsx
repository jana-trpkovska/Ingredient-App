import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/Home/HomeScreen';
import CookScreen from '../screens/Cook/CookScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import AddRecipeScreen from '../screens/AddRecipe/AddRecipeScreen';

import homeIcon from '../assets/home.png';
import cookingIcon from '../assets/cooking.png';
import settingsIcon from '../assets/setting.png';
import recipesIcon from '../assets/recipe.png';

import { spacing } from '../themes/spacing';
import { useTheme } from '../hooks/useTheme';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ setOnboardingSeen }: any) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.bottomNavColor,
          height: 60 + insets.bottom,
          paddingBottom: spacing.sm + insets.bottom,
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
                tintColor: focused ? theme.primary : theme.textSecondary,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add Recipe"
        component={AddRecipeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={recipesIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? theme.primary : theme.textSecondary,
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
                tintColor: focused ? theme.primary : theme.textSecondary,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={settingsIcon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? theme.primary : theme.textSecondary,
              }}
            />
          ),
        }}
      >
        {props => <SettingsScreen {...props} setOnboardingSeen={setOnboardingSeen} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}