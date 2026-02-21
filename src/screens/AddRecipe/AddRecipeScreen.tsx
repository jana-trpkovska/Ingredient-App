import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useIngredientStore } from '../../store/ingredientStore';
import { useRecipeStore } from '../../store/recipeStore';
import { IngredientSearchRecipe } from '../../types/recipe';
import { styles } from './AddRecipe.styles';
import { Ionicons } from '@expo/vector-icons';

export default function AddRecipeScreen({ navigation }: any) {
  const { ingredients } = useIngredientStore();
  const { searchRecipes, searchResults, saveRecipe, isRecipeSaved } = useRecipeStore();

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const toggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleSearch = () => {
    if (selectedIngredients.length === 0) return;
    searchRecipes(selectedIngredients);
  };

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
              : require('../../assets/placeholder_ingredient.png')
          }
          style={styles.ingredientOptionImage}
        />
        <Text style={[styles.ingredientOptionText, selected && styles.ingredientOptionTextSelected]}>
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
        onPress={() => navigation.navigate('DetailedRecipe', { recipeId: item.id })}
      >
        {item.image && <Image source={{ uri: item.image }} style={styles.recipeImage} />}
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeSubtitle}>
            Used: {item.usedIngredientCount} | Missing: {item.missedIngredientCount}
          </Text>
          <TouchableOpacity
            style={[styles.saveButton, saved && styles.saveButtonSaved]}
            onPress={() => saveRecipe(item)}
          >
            <Ionicons
              name={saved ? 'heart' : 'heart-outline'}
              size={20}
              color={saved ? '#ff6b81' : '#666'}
            />
            <Text style={styles.saveButtonText}>{saved ? 'Saved' : 'Save'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

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
            <View key={item.id}>
            {renderIngredient({ item })}
            </View>
         ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search Recipes</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Results</Text>
      {searchResults.length === 0 ? (
        <Text style={styles.emptyText}>No recipes found. Try searching!</Text>
      ) : (
        <View style={styles.recipeList}>
          {searchResults.map((item) => (
            <View key={item.id}>
              {renderRecipe({ item })}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}