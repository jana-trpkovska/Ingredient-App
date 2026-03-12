import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import HomeScreen from '../screens/Home/HomeScreen';
import CookScreen from '../screens/Cook/CookScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import AddRecipeScreen from '../screens/AddRecipe/AddRecipeScreen';

import homeIcon from '../../assets/images/home.png';
import cookingIcon from '../../assets/images/cooking.png';
import settingsIcon from '../../assets/images/setting.png';
import recipesIcon from '../../assets/images/recipe.png';

import { useTheme } from '../hooks/useTheme';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ setOnboardingSeen }: any) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const AnimatedTabIcon = ({ source, focused }: { source: any; focused: boolean }) => {
    const scale = useSharedValue(focused ? 1.2 : 1);

    React.useEffect(() => {
      scale.value = focused ? withSpring(1.2) : withSpring(1, { damping: 15, stiffness: 120 });
    }, [focused]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <Animated.Image
        source={source}
        style={[{ width: 24, height: 24, tintColor: focused ? theme.primary : theme.textSecondary }, animatedStyle]}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.bottomNavColor,
          height: 60 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <AnimatedTabIcon source={homeIcon} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Add Recipe"
        component={AddRecipeScreen}
        options={{
          tabBarIcon: ({ focused }) => <AnimatedTabIcon source={recipesIcon} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Cook"
        component={CookScreen}
        options={{
          tabBarIcon: ({ focused }) => <AnimatedTabIcon source={cookingIcon} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) => <AnimatedTabIcon source={settingsIcon} focused={focused} />,
        }}
      >
        {props => <SettingsScreen {...props} setOnboardingSeen={setOnboardingSeen} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}