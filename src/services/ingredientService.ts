import db from './database';
import { Ingredient } from '../types/ingredient';
import { IngredientCategory } from '../types/ingredientCategory';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/user';

export const addIngredient = (ingredient: Omit<Ingredient, 'id' | 'userId'>, userId: string) => {
  const id = uuidv4();
  try {
    db.runSync(
      `INSERT INTO ingredients (id, userId, name, category, quantity, unit, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, userId, ingredient.name, ingredient.category, ingredient.quantity ?? null, ingredient.unit ?? null, ingredient.image ?? null]
    );

    return { ...ingredient, id, userId };
  } catch (error) {
    console.log('Error adding ingredient:', error);
    throw error;
  }
};

export const getUserIngredients = (userId: string): Ingredient[] => {
  try {
    const result = db.getAllSync<Ingredient>(
      `SELECT * FROM ingredients WHERE userId = ?`,
      [userId]
    );
    return result;
  } catch (error) {
    console.log('Error fetching ingredients:', error);
    return [];
  }
};

export const updateUserIngredient = (userId: string, ingredient: Ingredient) => {
  try {
    db.runSync(
      `UPDATE ingredients
       SET name = ?, category = ?, quantity = ?, unit = ?, image = ?
       WHERE id = ? AND userId = ?`,
      [ingredient.name, ingredient.category, ingredient.quantity ?? null, ingredient.unit ?? null, ingredient.image ?? null, ingredient.id, userId]
    );
  } catch (error) {
    console.log('Error updating ingredient:', error);
    throw error;
  }
};

export const removeUserIngredient = (userId: string, ingredientId: string) => {
  try {
    db.runSync(
      `DELETE FROM ingredients WHERE id = ? AND userId = ?`,
      [ingredientId, userId]
    );
  } catch (error) {
    console.log('Error removing ingredient:', error);
    throw error;
  }
};
