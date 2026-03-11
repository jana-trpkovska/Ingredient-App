import React, { useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIngredientStore } from '../../store/ingredientStore';
import { useRecipeStore } from '../../store/recipeStore';
import { createStyles } from './Cook.styles';
import deleteIcon from '../../assets/delete.png';
import emptyCookImg from '../../assets/no_recipes.png';
import { isIngredientMissing } from '../../utils/pantry';
import { useTheme } from '../../hooks/useTheme';

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

    const missingIngredients = recipe.extendedIngredients.filter(
      (ing: any) => isIngredientMissing(ing.name, userPantryNames)
    );

    return missingIngredients.length === 0;
  };

  const sortedRecipes = useMemo(() => {
    if (!Array.isArray(savedRecipes)) return [];

    const validRecipes = savedRecipes.filter(Boolean);
    const cookable = validRecipes.filter((r) => isCookable(r));
    const notCookable = validRecipes.filter((r) => !isCookable(r));

    cookable.sort((a, b) => a.title.localeCompare(b.title));
    notCookable.sort((a, b) => a.title.localeCompare(b.title));

    return [...cookable, ...notCookable];
  }, [savedRecipes, userPantryNames]);

  const renderRecipe = ({ item }: any) => {
    const cookable = isCookable(item);

    return (
      <TouchableOpacity
        style={[styles.recipeCard, !cookable && styles.recipeCardDisabled]}
        onPress={() =>
          navigation.navigate('DetailedRecipe', { recipeId: item.id })
        }
      >
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={[styles.recipeImage, !cookable && { opacity: 0.4 }]}
          />
        )}

        <View style={styles.recipeInfo}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text
                style={[styles.recipeTitle, !cookable && { color: theme.textSecondary }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.title}
              </Text>
            </View>

            <TouchableOpacity onPress={() => removeRecipe(item.id)}>
              <Image source={deleteIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>

          {!cookable && (
            <Text style={styles.missingText}>Missing ingredients</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

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
          renderItem={renderRecipe}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.navigate('MainTabs', { screen: 'Add Recipe' })
        }
      >
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}