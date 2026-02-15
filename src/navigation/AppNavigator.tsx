import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import HeaderTitle from '../components/HeaderTitle';
import LoginScreen from '../screens/Login/LoginScreen';
import SignupScreen from '../screens/Signup/SignupScreen';

import avatarIcon from '../assets/avatar.png';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import EditProfileScreen from '../screens/EditProfile/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTitle: () => <HeaderTitle />,
          headerTitleAlign: 'left',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.avatarContainer}
            >
              <Image source={avatarIcon} style={styles.avatar} />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator} 
        />

        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen} 
          options={{ headerShown: false }} 
        />
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
