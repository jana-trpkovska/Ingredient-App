import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useIngredientStore } from "../../store/ingredientStore";
import { useRecipeStore } from "../../store/recipeStore";
import { useUserStore } from "../../store/userStore";
import { IngredientSearchRecipe } from "../../types/recipe";
import { createStyles } from "./AddRecipe.styles";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../hooks/useTheme";
import noIngredientsLight from "../../assets/no_select_ingredients_light.png";
import noIngredientsDark from "../../assets/no_select_ingredients_dark.png";
import { useFocusEffect } from "@react-navigation/native";

export default function AddRecipeScreen({ navigation }: any) {
  const { ingredients } = useIngredientStore();
  const { searchRecipes, searchResults, saveRecipe, isRecipeSaved, removeRecipe, apiMessage, clearApiMessage, clearSearchResults } = useRecipeStore();
  const { currentUser } = useUserStore();

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [showNoIngredientsMessage, setShowNoIngredientsMessage] = useState(false);

  const { theme, isDark } = useTheme();
  const styles = createStyles(theme);

  const toggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
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

  const renderIngredient = ({ item }: any) => {
    const selected = selectedIngredients.includes(item.name);
    return (
      <TouchableOpacity
        style={[styles.ingredientOptionCard, selected && styles.ingredientOptionCardSelected]}
        onPress={() => toggleIngredient(item.name)}
      >
        <Image
          source={
            item.image
              ? { uri: item.image }
              : require("../../assets/placeholder_ingredient.png")
          }
          style={styles.ingredientOptionImage}
        />
        <Text
          style={[
            styles.ingredientOptionText,
            selected && styles.ingredientOptionTextSelected,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRecipe = ({ item }: { item: IngredientSearchRecipe }) => {
    const saved = isRecipeSaved(item.id);
    return (
      <TouchableOpacity
        style={styles.recipeCard}
        onPress={() => navigation.navigate("DetailedRecipe", { recipeId: item.id })}
      >
        {item.image && <Image source={{ uri: item.image }} style={styles.recipeImage} />}
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeSubtitle}>
            Used: {item.usedIngredientCount} | Missing: {item.missedIngredientCount}
          </Text>
          <TouchableOpacity
            style={[styles.saveButton]}
            onPress={() => (saved ? removeRecipe(item.id) : saveRecipe(item.id))}
          >
            <Ionicons
              name={saved ? "heart" : "heart-outline"}
              size={20}
              color={saved ? theme.danger : theme.textSecondary}
            />
            <Text style={styles.saveButtonText}>{saved ? "Saved" : "Save"}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

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
          {ingredients.map((item) => (
            <View key={item.id}>{renderIngredient({ item })}</View>
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
        <Text style={[styles.emptyText, { color: theme.danger, textAlign: "center" }]}>
          {apiMessage}
        </Text>
      ) : searchResults.length === 0 ? (
        <Text style={styles.emptyText}>No recipes found. Try searching!</Text>
      ) : (
        <View style={styles.recipeList}>
          {searchResults.map((item) => (
            <View key={item.id}>{renderRecipe({ item })}</View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}