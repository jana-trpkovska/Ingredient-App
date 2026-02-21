import db from './database';
import { IngredientSearchRecipe } from '../types/recipe';

export const addUserRecipe = (
  userId: string,
  recipe: IngredientSearchRecipe
) => {
  try {
    db.runSync(
      `INSERT OR REPLACE INTO recipes
       (id, userId, title, image, usedIngredients, missedIngredients)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        recipe.id,
        userId,
        recipe.title,
        recipe.image ?? null,
        JSON.stringify(recipe.usedIngredients),
        JSON.stringify(recipe.missedIngredients),
      ]
    );

    return recipe;
  } catch (error) {
    console.log('Error saving recipe:', error);
    throw error;
  }
};

export const getUserRecipes = (
  userId: string
): IngredientSearchRecipe[] => {
  try {
    const result = db.getAllSync<any>(
      `SELECT * FROM recipes WHERE userId = ?`,
      [userId]
    );

    return result.map((row) => ({
      id: row.id,
      title: row.title,
      image: row.image,
      usedIngredientCount: JSON.parse(row.usedIngredients)?.length ?? 0,
      missedIngredientCount: JSON.parse(row.missedIngredients)?.length ?? 0,
      usedIngredients: JSON.parse(row.usedIngredients) ?? [],
      missedIngredients: JSON.parse(row.missedIngredients) ?? [],
    }));
  } catch (error) {
    console.log('Error fetching recipes:', error);
    return [];
  }
};

export const removeUserRecipe = (
  userId: string,
  recipeId: number
) => {
  try {
    db.runSync(
      `DELETE FROM recipes WHERE id = ? AND userId = ?`,
      [recipeId, userId]
    );
  } catch (error) {
    console.log('Error removing recipe:', error);
    throw error;
  }
};