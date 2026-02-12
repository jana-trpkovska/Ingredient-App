import { create } from 'zustand';

export interface Ingredient {
  id: string;
  name: string;
  amount?: string;
  imageUri?: string;
}

interface IngredientStore {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (id: string) => void;
}

export const useIngredientStore = create<IngredientStore>((set) => ({
  ingredients: [
    { id: '1', name: 'Tomato', amount: '3 pcs', imageUri: '' },
    { id: '2', name: 'Cheese', amount: '200g', imageUri: '' },
    { id: '3', name: 'Eggs', amount: '6 pcs', imageUri: '' },
  ],
  addIngredient: (ingredient) =>
    set((state) => ({ ingredients: [...state.ingredients, ingredient] })),
  removeIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter((ing) => ing.id !== id),
    })),
}));
