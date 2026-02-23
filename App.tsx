import 'react-native-get-random-values';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { initDB } from './src/services/database';
import { useEffect } from 'react';

import { useUserStore } from './src/store/userStore';
import { useIngredientStore } from './src/store/ingredientStore';
import { useRecipeStore } from './src/store/recipeStore';

export default function App() {
  const currentUser = useUserStore((state) => state.currentUser);
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


  return (
  <>
    <StatusBar style="dark" />
    <AppNavigator />
  </>
  );
}
