import db from './database';
import { DetailedRecipe } from '../types/recipe';

export const addUserRecipe = (userId: string, recipe: DetailedRecipe) => {
  try {
    db.runSync(
      `INSERT OR REPLACE INTO recipes
       (id, userId, title, image, extendedIngredients, readyInMinutes, servings, summary, instructions, analyzedInstructions)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.id,
        userId,
        recipe.title,
        recipe.image ?? null,
        JSON.stringify(recipe.extendedIngredients),
        recipe.readyInMinutes ?? null,
        recipe.servings ?? null,
        recipe.summary ?? "",
        recipe.instructions ?? "",
        JSON.stringify(recipe.analyzedInstructions ?? []),
      ]
    );
    return recipe;
  } catch (error) {
    console.log("Error saving recipe:", error);
    throw error;
  }
};

export const getUserRecipes = (userId: string): DetailedRecipe[] => {
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
      readyInMinutes: row.readyInMinutes ?? 0,
      servings: row.servings ?? 0,
      summary: row.summary ?? "",
      instructions: row.instructions ?? "",
      analyzedInstructions: JSON.parse(row.analyzedInstructions) ?? [],
    }));
  } catch (error) {
    console.log("Error fetching recipes:", error);
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