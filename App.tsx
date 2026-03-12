import 'react-native-get-random-values';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { initDB } from './src/services/database';
import { useEffect, useState } from 'react';
import Animated, { LinearTransition, FadeIn, FadeOut, FadeInDown } from 'react-native-reanimated';

import { useUserStore } from './src/store/userStore';
import { useIngredientStore } from './src/store/ingredientStore';
import { useRecipeStore } from './src/store/recipeStore';

import { getUserById } from './src/services/userService';

export default function App() {
  const { userId, currentUser, setCurrentUser, isHydrated } = useUserStore();
  const [ready, setReady] = useState(false);

  const fetchIngredients = useIngredientStore((state) => state.fetchIngredients);
  const fetchSavedRecipes = useRecipeStore((state) => state.fetchSavedRecipes);

  useEffect(() => {
    try {
      initDB();
      console.log('Database initialized');
    } catch (error) {
      console.log('Database initialization error:', error);
    }
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      if (isHydrated && userId && !currentUser) {
        const user = await getUserById(userId);
        if (user) {
          setCurrentUser(user);
        }
      }

      if (isHydrated) {
        setReady(true);
      }
    };

    loadUser();
  }, [isHydrated, userId]);

  useEffect(() => {
    if (currentUser) {
      fetchIngredients();
      fetchSavedRecipes();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      useIngredientStore.setState({ ingredients: [] });
      useRecipeStore.setState({ savedRecipes: [] });
    }
  }, [currentUser]);

  if (!ready) {
    return null;
  }

  return (
    <Animated.View 
      style={{ flex: 1 }} 
      entering={FadeInDown.duration(800).withInitialValues({ opacity: 0.6 })}
    >
      <StatusBar style="dark" />
      <AppNavigator />
    </Animated.View>
  );
}