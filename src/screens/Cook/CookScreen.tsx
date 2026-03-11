import React, { useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIngredientStore } from "../../store/ingredientStore";
import { useRecipeStore } from "../../store/recipeStore";
import { createStyles } from "./Cook.styles";
import { isIngredientMissing } from "../../utils/pantry";
import { useTheme } from "../../hooks/useTheme";
import CookRecipeCard from "../../components/cards/CookRecipeCard/CookRecipeCard";
import emptyCookImg from "../../../assets/images/no_recipes.png";

export default function CookScreen() {
  const navigation = useNavigation<any>();
  const ingredients = useIngredientStore((state) => state.ingredients);
  const savedRecipes = useRecipeStore((state) => state.savedRecipes);
  const removeRecipe = useRecipeStore((state) => state.removeRecipe);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const userPantryNames = useMemo(
    () => ingredients.map((i) => i.name?.toLowerCase().trim()),
    [ingredients]
  );

  const isCookable = (recipe: any) => {
    if (!recipe || !Array.isArray(recipe.extendedIngredients)) return false;
    const missing = recipe.extendedIngredients.filter((ing: any) =>
      isIngredientMissing(ing.name, userPantryNames)
    );
    return missing.length === 0;
  };

  const sortedRecipes = useMemo(() => {
    if (!Array.isArray(savedRecipes)) return [];
    const validRecipes = savedRecipes.filter(Boolean);
    const cookable = validRecipes.filter(isCookable);
    const notCookable = validRecipes.filter((r) => !isCookable(r));
    cookable.sort((a, b) => a.title.localeCompare(b.title));
    notCookable.sort((a, b) => a.title.localeCompare(b.title));
    return [...cookable, ...notCookable];
  }, [savedRecipes, userPantryNames]);

  const showEmptyState = sortedRecipes.length === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Saved Recipes</Text>

      {showEmptyState ? (
        <View style={styles.emptyContainer}>
          <Image source={emptyCookImg} style={styles.emptyImage} />
          <Text style={styles.emptyTitle}>No Recipes Saved</Text>
          <Text style={styles.emptySubtitle}>
            Start adding your favorite recipes and keep them handy for cooking!
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CookRecipeCard
              title={item.title}
              image={item.image}
              cookable={isCookable(item)}
              onPress={() => navigation.navigate("DetailedRecipe", { recipeId: item.id })}
              onRemove={() => removeRecipe(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("MainTabs", { screen: "Add Recipe" })}
      >
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}