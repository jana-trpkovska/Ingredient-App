import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIngredientStore } from '../../store/ingredientStore';
import { useRecipeStore } from '../../store/recipeStore';
import { styles } from './Cook.styles';
import { colors } from '../../themes/colors';

export default function CookScreen() {
  const navigation = useNavigation<any>();
  const ingredients = useIngredientStore((state) => state.ingredients);
  const savedRecipes = useRecipeStore((state) => state.savedRecipes);

  const isCookable = (recipe: any) => {
    if (
      !recipe ||
      !Array.isArray(recipe.extendedIngredients) ||
      recipe.extendedIngredients.length === 0
    ) {
      return false;
    }

    const pantryNames = ingredients.map((i) =>
      i.name?.toLowerCase().trim()
    );

    return recipe.extendedIngredients.every((ingredient: any) => {
      if (!ingredient || !ingredient.name) return false;

      return pantryNames.some((p) =>
        p?.includes(ingredient.name.toLowerCase().trim())
      );
    });
  };

  const sortedRecipes = useMemo(() => {
    if (!Array.isArray(savedRecipes)) return [];

    const validRecipes = savedRecipes.filter(Boolean);

    const cookable = validRecipes.filter((r) => isCookable(r));
    const notCookable = validRecipes.filter((r) => !isCookable(r));

    return [...cookable, ...notCookable];
  }, [savedRecipes, ingredients]);

  const renderRecipe = ({ item }: any) => {
    const cookable = isCookable(item);

    return (
      <TouchableOpacity
        style={[
          styles.recipeCard,
          !cookable && styles.recipeCardDisabled,
        ]}
        onPress={() =>
          navigation.navigate('DetailedRecipe', {
            recipeId: item.id,
          })
        }
      >
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={[
              styles.recipeImage,
              !cookable && { opacity: 0.4 },
            ]}
          />
        )}

        <View style={styles.recipeInfo}>
          <Text
            style={[
              styles.recipeTitle,
              !cookable && { color: colors.textSecondary },
            ]}
          >
            {item.title}
          </Text>

          {!cookable && (
            <Text style={styles.missingText}>
              Missing ingredients
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Saved Recipes</Text>

      {sortedRecipes.length === 0 ? (
        <Text style={styles.emptyText}>
          You haven't saved any recipes yet.
        </Text>
      ) : (
        <FlatList
          data={sortedRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipe}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('MainTabs', { screen: 'Add Recipe' })}
      >
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}