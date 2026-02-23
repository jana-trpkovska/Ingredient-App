import db from './database';
import { SavedRecipe } from '../types/recipe';

export const addUserRecipe = (
  userId: string,
  recipe: SavedRecipe
) => {
  try {
    db.runSync(
      `INSERT OR REPLACE INTO recipes
       (id, userId, title, image, extendedIngredients, readyInMinutes, servings)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.id,
        userId,
        recipe.title,
        recipe.image ?? null,
        JSON.stringify(recipe.extendedIngredients),
        recipe.readyInMinutes ?? null,
        recipe.servings ?? null,
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
): SavedRecipe[] => {
  try {
    const result = db.getAllSync<any>(
      `SELECT * FROM recipes WHERE userId = ?`,
      [userId]
    );

    return result.map((row) => ({
      id: row.id,
      title: row.title,
      image: row.image,
      extendedIngredients: JSON.parse(row.extendedIngredients) ?? [],
      readyInMinutes: row.readyInMinutes ?? undefined,
      servings: row.servings ?? undefined,
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