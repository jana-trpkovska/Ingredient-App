export type IngredientAmount = {
  id: number;
  name: string;
  amount: number;
  unit: string;
};

export type IngredientSearchRecipe = {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  usedIngredients: IngredientAmount[];
  missedIngredients: IngredientAmount[];
};

export type DetailedRecipe = {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  summary: string;
  instructions: string;
  extendedIngredients: IngredientAmount[];
};