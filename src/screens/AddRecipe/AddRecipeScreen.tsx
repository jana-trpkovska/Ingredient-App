import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { useIngredientStore } from "../../store/ingredientStore";
import { useRecipeStore } from "../../store/recipeStore";
import { useUserStore } from "../../store/userStore";
import { useTheme } from "../../hooks/useTheme";
import { useFocusEffect } from "@react-navigation/native";
import { createStyles } from "./AddRecipe.styles";

import SelectableIngredientCard from "../../components/cards/SelectableIngredientCard/SelectableIngredientCard";
import SearchResultRecipeCard from "../../components/cards/SearchResultRecipeCard/SearchResultRecipeCard";

import noIngredientsLight from "../../../assets/images/no_select_ingredients_light.png";
import noIngredientsDark from "../../../assets/images/no_select_ingredients_dark.png";

export default function AddRecipeScreen({ navigation }: any) {
  const { ingredients } = useIngredientStore();
  const { searchRecipes, searchResults, saveRecipe, isRecipeSaved, removeRecipe, apiMessage, clearApiMessage, clearSearchResults } = useRecipeStore();
  const { currentUser } = useUserStore();

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showNoIngredientsMessage, setShowNoIngredientsMessage] = useState(false);

  const { theme, isDark } = useTheme();
  const styles = createStyles(theme);

  const toggleIngredient = (name: string) => {
    setSelectedIngredients(prev =>
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
    if (selectedIngredients.length === 0) setShowNoIngredientsMessage(false);
  };

  const handleSearch = () => {
    if (selectedIngredients.length === 0) {
      setShowNoIngredientsMessage(true);
      return;
    }
    setShowNoIngredientsMessage(false);
    if (currentUser?.diet?.trim()) searchRecipes(selectedIngredients, true);
    else searchRecipes(selectedIngredients);
  };

  useEffect(() => {
    if (apiMessage) {
      const timer = setTimeout(() => clearApiMessage(), 5000);
      return () => clearTimeout(timer);
    }
  }, [apiMessage]);

  useFocusEffect(
    useCallback(() => {
      clearApiMessage();
      clearSearchResults();
      setSelectedIngredients([]);
      setShowNoIngredientsMessage(false);
    }, [])
  );

  const showEmptyState = ingredients.length === 0;
  const noIngredientsImg = isDark ? noIngredientsDark : noIngredientsLight;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Select Ingredients</Text>

      <View style={styles.ingredientListContainer}>
        <ScrollView
          style={{ flexGrow: 0 }}
          contentContainerStyle={styles.ingredientOptionList}
          showsVerticalScrollIndicator
          nestedScrollEnabled
        >
          {ingredients.map(item => (
            <SelectableIngredientCard
              key={item.id}
              name={item.name}
              image={item.image}
              selected={selectedIngredients.includes(item.name)}
              onPress={() => toggleIngredient(item.name)}
            />
          ))}
        </ScrollView>
      </View>

      {showEmptyState && (
        <View style={styles.emptyContainer}>
          <Image source={noIngredientsImg} style={styles.emptyImage} />
          <Text style={styles.emptyTitle}>No Ingredients Added</Text>
          <Text style={styles.emptySubtitle}>
            Start adding ingredients to search for recipes easily!
          </Text>
        </View>
      )}

      {currentUser?.diet && (
        <Text style={{ marginVertical: 8, color: theme.textSecondary }}>
          Diet applied: {currentUser.diet}
        </Text>
      )}

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search Recipes</Text>
      </TouchableOpacity>

      {showNoIngredientsMessage && (
        <Text style={styles.noIngredientsText}>
          Please select at least one ingredient to search recipes.
        </Text>
      )}

      <Text style={styles.sectionTitle}>Results</Text>

      {apiMessage ? (
        <Text style={[styles.emptyText, { color: theme.danger, textAlign: 'center' }]}>
          {apiMessage}
        </Text>
      ) : searchResults.length === 0 ? (
        <Text style={styles.emptyText}>No recipes found. Try searching!</Text>
      ) : (
        <View style={styles.recipeList}>
          {searchResults.map(item => (
            <SearchResultRecipeCard
              key={item.id}
              recipe={item}
              saved={isRecipeSaved(item.id)}
              onToggleSave={() =>
                isRecipeSaved(item.id) ? removeRecipe(item.id) : saveRecipe(item.id)
              }
              onPress={() => navigation.navigate("DetailedRecipe", { recipeId: item.id })}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}