import { create } from 'zustand';
import { Ingredient } from '../types/ingredient';

interface IngredientStore {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (id: string) => void;
}

export const useIngredientStore = create<IngredientStore>((set) => ({
  ingredients: [
    { id: '1', name: 'Tomato', quantity: 3, unit: 'pcs', category: 'vegetables',  image: '' },
    { id: '2', name: 'Cheese', quantity: 200, unit: 'g', category: 'dairy',  image: '' },
    { id: '3', name: 'Apple', quantity: 1, unit: 'kg', category: 'fruits',  image: '' },
  ],
  addIngredient: (ingredient) =>
    set((state) => ({ ingredients: [...state.ingredients, ingredient] })),
  removeIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter((ing) => ing.id !== id),
    })),
}));
