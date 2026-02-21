import axios from "axios";
import { IngredientSearchRecipe, DetailedRecipe, IngredientAmount } from "../types/recipe";

const API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;

if (!API_KEY) {
  console.warn("Spoonacular API key is missing in .env");
}

const api = axios.create({
  baseURL: "https://api.spoonacular.com",
  params: {
    apiKey: API_KEY,
  },
});

const mapIngredient = (ingredient: any): IngredientAmount => ({
  id: ingredient.id,
  name: ingredient.name,
  amount: ingredient.amount ?? 0,
  unit: ingredient.unit ?? "",
});

export const searchRecipesByIngredients = async (
  ingredients: string[],
  diet?: string
): Promise<IngredientSearchRecipe[]> => {
  try {
    const response = await api.get("/recipes/findByIngredients", {
      params: {
        ingredients: ingredients.join(","),
        number: 20,
        ranking: 1,
        ignorePantry: true,
        diet: diet || undefined,
      },
    });

    return response.data.map((r: any) => ({
      id: r.id,
      title: r.title,
      image: r.image,
      usedIngredientCount: r.usedIngredientCount ?? 0,
      missedIngredientCount: r.missedIngredientCount ?? 0,
      usedIngredients: Array.isArray(r.usedIngredients)
        ? r.usedIngredients.map(mapIngredient)
        : [],
      missedIngredients: Array.isArray(r.missedIngredients)
        ? r.missedIngredients.map(mapIngredient)
        : [],
    }));
  } catch (error) {
    console.error("Error fetching recipes from API:", error);
    return [];
  }
};

export const getRecipeDetails = async (id: number): Promise<DetailedRecipe | null> => {
  try {
    const response = await api.get(`/recipes/${id}/information`);

    const data = response.data;

    return {
      id: data.id,
      title: data.title,
      image: data.image,
      servings: data.servings ?? 1,
      readyInMinutes: data.readyInMinutes ?? 0,
      summary: data.summary ?? "",
      instructions: data.instructions ?? "",
      extendedIngredients: Array.isArray(data.extendedIngredients)
        ? data.extendedIngredients.map(mapIngredient)
        : [],
    };
  } catch (error) {
    console.error(`Error fetching recipe details for ID ${id}:`, error);
    return null;
  }
};