import { create } from 'zustand';
import { Ingredient } from '../types/ingredient';
import { useUserStore } from './userStore';
import { addIngredient as addIngredientService, getUserIngredients, updateUserIngredient, removeUserIngredient } from '../services/ingredientService';

interface IngredientStore {
  ingredients: Ingredient[];
  fetchIngredients: () => void;
  addIngredient: (ingredient: Omit<Ingredient, 'id' | 'userId'>) => void;
  updateIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (id: string) => void;
}

export const useIngredientStore = create<IngredientStore>((set, get) => ({
  ingredients: [],
  fetchIngredients: () => {
    const user = useUserStore.getState().currentUser;
    if (!user) return;
    const ingredients = getUserIngredients(user.id);
    set({ ingredients });
  },
  addIngredient: (ingredient) => {
    const user = useUserStore.getState().currentUser;
    if (!user) return;
    addIngredientService(ingredient, user.id);
    get().fetchIngredients();
  },
  updateIngredient: (ingredient) => {
    const user = useUserStore.getState().currentUser;
    if (!user) return;
    updateUserIngredient(user.id, ingredient);
    get().fetchIngredients();
  },
  removeIngredient: (id) => {
    const user = useUserStore.getState().currentUser;
    if (!user) return;
    removeUserIngredient(user.id, id);
    get().fetchIngredients();
  },
}));
