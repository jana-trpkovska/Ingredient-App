import { create } from "zustand";
import { IngredientSearchRecipe, DetailedRecipe } from "../types/recipe";
import { useUserStore } from "./userStore";
import {
  addUserRecipe,
  getUserRecipes,
  removeUserRecipe,
} from "../services/recipeLocalService";
import {
  searchRecipesByIngredients,
  searchRecipesComplex,
  getRecipeDetails,
} from "../services/recipeApiService";

interface RecipeStore {
  savedRecipes: DetailedRecipe[];
  searchResults: IngredientSearchRecipe[];
  apiMessage: string | null;
  fetchSavedRecipes: () => void;
  searchRecipes: (ingredients: string[], useComplex?: boolean) => Promise<void>;
  saveRecipe: (recipeId: number) => Promise<void>;
  removeRecipe: (recipeId: number) => void;
  isRecipeSaved: (recipeId: number) => boolean;
  getRecipeDetailsById: (id: number) => Promise<DetailedRecipe | null>;
  clearApiMessage: () => void;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  savedRecipes: [],
  searchResults: [],
  apiMessage: null,

  fetchSavedRecipes: () => {
    const user = useUserStore.getState().currentUser;
    if (!user) return;

    const recipes = getUserRecipes(user.id);
    set({ savedRecipes: recipes });
  },

  searchRecipes: async (ingredients: string[], useComplex = false) => {
    const user = useUserStore.getState().currentUser;
    const diet = user?.diet || undefined;

    let result;
    if (useComplex) {
      result = await searchRecipesComplex(ingredients, diet);
    } else {
      result = await searchRecipesByIngredients(ingredients, diet);
    }

    if (result.error) {
      set({ searchResults: [], apiMessage: result.error });
    } else {
      set({ searchResults: result.data, apiMessage: null });
    }
  },

  saveRecipe: async (recipeId: number) => {
    const user = useUserStore.getState().currentUser;
    if (!user) return;

    const { data, error } = await getRecipeDetails(recipeId);
    if (error) {
      set({ apiMessage: error });
      return;
    }
    if (!data) return;

    addUserRecipe(user.id, data);
    get().fetchSavedRecipes();
    set({ apiMessage: null });
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
    const saved = get().savedRecipes.find((r) => r.id === id);
    if (saved) return saved;

    const { data, error } = await getRecipeDetails(id);
    if (error) set({ apiMessage: error });
    return data;
  },

  clearApiMessage: () => set({ apiMessage: null }),
}));