import { IngredientCategory } from "./ingredientCategory";
import { IngredientUnit } from "./ingredientUnit";

export interface Ingredient {
  id: string;
  userId: string;
  name: string;
  image?: string;
  category: IngredientCategory;
  quantity?: number;
  unit?: IngredientUnit;
}
