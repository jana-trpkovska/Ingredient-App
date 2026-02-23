import { create } from 'zustand';
import { IngredientSearchRecipe, DetailedRecipe, SavedRecipe } from '../types/recipe';
import { useUserStore } from './userStore';
import {
  addUserRecipe,
  getUserRecipes,
  removeUserRecipe,
} from '../services/recipeLocalService';
import {
  searchRecipesByIngredients,
  getRecipeDetails,
} from '../services/recipeApiService';

interface RecipeStore {
  savedRecipes: SavedRecipe[];
  searchResults: IngredientSearchRecipe[];
  fetchSavedRecipes: () => void;
  searchRecipes: (ingredients: string[], diet?: string) => Promise<void>;
  saveRecipe: (recipeId: number) => Promise<void>;
  removeRecipe: (recipeId: number) => void;
  isRecipeSaved: (recipeId: number) => boolean;
  getRecipeDetailsById: (id: number) => Promise<DetailedRecipe | null>;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  savedRecipes: [],
  searchResults: [],

  fetchSavedRecipes: () => {
    const user = useUserStore.getState().currentUser;
    if (!user) return;

    const recipes = getUserRecipes(user.id);
    set({ savedRecipes: recipes });
  },

  searchRecipes: async (ingredients: string[], diet?: string) => {
    try {
      const results = await searchRecipesByIngredients(ingredients, diet);
      set({ searchResults: results });
    } catch (error) {
      console.error('Error searching recipes:', error);
      set({ searchResults: [] });
    }
  },

  saveRecipe: async (recipeId: number) => {
    const user = useUserStore.getState().currentUser;
    if (!user) return;

    const detailed = await getRecipeDetails(recipeId);
    if (!detailed) return;

    const recipeToSave: SavedRecipe = {
      id: detailed.id,
      title: detailed.title,
      image: detailed.image,
      extendedIngredients: detailed.extendedIngredients,
      readyInMinutes: detailed.readyInMinutes,
      servings: detailed.servings,
    };

    addUserRecipe(user.id, recipeToSave);
    get().fetchSavedRecipes();
  },

  removeRecipe: (recipeId) => {
    const user = useUserStore.getState().currentUser;
    if (!user) return;

    removeUserRecipe(user.id, recipeId);
    get().fetchSavedRecipes();
  },

  isRecipeSaved: (recipeId) => {
    return get().savedRecipes.some((r) => r.id === recipeId);
  },

  getRecipeDetailsById: async (id) => {
    try {
      const details = await getRecipeDetails(id);
      return details;
    } catch (error) {
      console.error(`Error fetching recipe details for ID ${id}:`, error);
      return null;
    }
  },
}));