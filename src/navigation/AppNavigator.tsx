import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HeaderTitle from '../components/HeaderTitle';
import LoginScreen from '../screens/Login/LoginScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import EditProfileScreen from '../screens/EditProfile/EditProfileScreen';
import AddIngredientScreen from '../screens/AddIngredient/AddIngredientScreen';
import IngredientDetailsScreen from '../screens/IngredientDetails/IngredientDetailsScreen';
import DetailedRecipeScreen from '../screens/DetailedRecipe/DetailedRecipeScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';

import avatarIcon from '../assets/avatar.png';
import { spacing } from '../themes/spacing';
import { useTheme } from '../hooks/useTheme';
import { useUserStore } from '../store/userStore';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { theme, isDark } = useTheme();
  const { currentUser } = useUserStore();

  const [onboardingSeen, setOnboardingSeen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const seen = await AsyncStorage.getItem('onboardingSeen');
      setOnboardingSeen(seen === 'true');
    };
    checkOnboarding();
  }, []);


  if (onboardingSeen === null) return null;

  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: theme.background,
      card: theme.headerBackground,
      text: theme.textPrimary,
      border: theme.border,
      primary: theme.primary,
    },
  };

  return (
    <NavigationContainer key={onboardingSeen ? 'main' : 'onboarding'} theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: theme.headerBackground },
          headerTitle: () => <HeaderTitle />,
          headerTitleAlign: 'left',
          headerRight: () =>
            currentUser && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.avatarContainer}
              >
                <Image source={avatarIcon} style={styles.avatar} />
              </TouchableOpacity>
            ),
          headerBackTitleVisible: false,
          headerTintColor: theme.headerColor,
        })}
      >
        {!onboardingSeen && (
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {(props) => (
              <OnboardingScreen
                {...props}
                onFinish={async () => {
                  await AsyncStorage.setItem('onboardingSeen', 'true');
                  setOnboardingSeen(true);
                  props.navigation.replace(currentUser ? 'MainTabs' : 'Login');
                }}
              />
            )}
          </Stack.Screen>
        )}

        {!currentUser && (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </>
        )}

        {currentUser && (
          <>
            <Stack.Screen name="MainTabs">
              {(props) => <TabNavigator {...props} setOnboardingSeen={setOnboardingSeen} />}
            </Stack.Screen>
            <Stack.Screen name="AddIngredient" component={AddIngredientScreen} />
            <Stack.Screen name="IngredientDetails" component={IngredientDetailsScreen} />
            <Stack.Screen name="DetailedRecipe" component={DetailedRecipeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});