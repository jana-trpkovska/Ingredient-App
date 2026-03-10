import axios from "axios";
import { IngredientSearchRecipe, DetailedRecipe, IngredientAmount } from "../types/recipe";

const API_KEY = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;

if (!API_KEY) {
  console.warn("Spoonacular API key is missing in .env");
}

const api = axios.create({
  baseURL: "https://api.spoonacular.com",
  params: { apiKey: API_KEY },
});

const mapIngredient = (ingredient: any): IngredientAmount => ({
  id: ingredient.id,
  name: ingredient.name,
  amount: ingredient.amount ?? 0,
  unit: ingredient.unit ?? "",
});

const QUOTA_MESSAGE = "Spoonacular daily quota reached. Please try again later.";

export const searchRecipesByIngredients = async (
  ingredients: string[],
  diet?: string
): Promise<{ data: IngredientSearchRecipe[]; error?: string }> => {
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

    const results: IngredientSearchRecipe[] = response.data.map((r: any) => ({
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

    return { data: results };
  } catch (error: any) {
    const isQuotaError = error.response?.status === 402;
    return {
      data: [],
      error: isQuotaError ? QUOTA_MESSAGE : error.response?.data?.message || "Error fetching recipes.",
    };
  }
};

export const searchRecipesComplex = async (
  ingredients: string[],
  diet?: string
): Promise<{ data: IngredientSearchRecipe[]; error?: string }> => {
  try {
    const response = await api.get("/recipes/complexSearch", {
      params: {
        includeIngredients: ingredients.join(","),
        diet: diet || undefined,
        number: 20,
        addRecipeInformation: true,
        fillIngredients: true,
      },
    });

    const results: IngredientSearchRecipe[] = response.data.results.map((r: any) => ({
      id: r.id,
      title: r.title,
      image: r.image,
      usedIngredientCount: r.usedIngredients?.length ?? 0,
      missedIngredientCount: r.missedIngredients?.length ?? 0,
      usedIngredients: Array.isArray(r.usedIngredients)
        ? r.usedIngredients.map(mapIngredient)
        : [],
      missedIngredients: Array.isArray(r.missedIngredients)
        ? r.missedIngredients.map(mapIngredient)
        : [],
    }));

    return { data: results };
  } catch (error: any) {
    const isQuotaError = error.response?.status === 402;
    return {
      data: [],
      error: isQuotaError ? QUOTA_MESSAGE : error.response?.data?.message || "Error fetching recipes.",
    };
  }
};

export const getRecipeDetails = async (
  id: number
): Promise<{ data: DetailedRecipe | null; error?: string }> => {
  try {
    const response = await api.get(`/recipes/${id}/information`);
    const data = response.data;

    const detailed: DetailedRecipe = {
      id: data.id,
      title: data.title,
      image: data.image,
      servings: data.servings ?? 1,
      readyInMinutes: data.readyInMinutes ?? 0,
      summary: data.summary ?? "",
      instructions: data.instructions ?? "",
      analyzedInstructions: Array.isArray(data.analyzedInstructions)
        ? data.analyzedInstructions
        : [],
      extendedIngredients: Array.isArray(data.extendedIngredients)
        ? data.extendedIngredients.map(mapIngredient)
        : [],
    };

    return { data: detailed };
  } catch (error: any) {
    const isQuotaError = error.response?.status === 402;
    return {
      data: null,
      error: isQuotaError ? QUOTA_MESSAGE : error.response?.data?.message || "Error fetching recipe details.",
    };
  }
};