import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRecipeStore } from '../../store/recipeStore';
import { useIngredientStore } from '../../store/ingredientStore';
import { DetailedRecipe } from '../../types/recipe';
import { createStyles } from './DetailedRecipe.styles';
import timerIcon from '../../assets/timer.png';
import servingsIcon from '../../assets/servings.png';
import missingIcon from '../../assets/missing.png';
import { isIngredientMissing } from '../../utils/pantry';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

export default function DetailedRecipeScreen() {
  const route = useRoute<any>();
  const { recipeId } = route.params;

  const { getRecipeDetailsById, savedRecipes, apiMessage, clearApiMessage } = useRecipeStore();
  const userIngredients = useIngredientStore((state) => state.ingredients);
  const removeIngredient = useIngredientStore((state) => state.removeIngredient);

  const savedRecipe = savedRecipes.find(r => r.id === recipeId);
  const [recipe, setRecipe] = useState<DetailedRecipe | null>(savedRecipe || null);
  const [loading, setLoading] = useState(!savedRecipe);

  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const userPantryNames = useMemo(
    () => userIngredients.map(i => i.name?.toLowerCase().trim()),
    [userIngredients]
  );

  const cookable = useMemo(() => {
    if (!recipe?.extendedIngredients) return false;
    return recipe.extendedIngredients.every(
      ing => !isIngredientMissing(ing.name, userPantryNames)
    );
  }, [recipe, userPantryNames]);

  useEffect(() => {
    if (recipe) return;

    const loadRecipe = async () => {
      setLoading(true);
      const data = await getRecipeDetailsById(recipeId);

      if (data && 'error' in data && data.error) {
        setRecipe(null);
      } else if (data) {
        setRecipe(data as DetailedRecipe);
      } else {
        setRecipe(null);
      }

      setLoading(false);
    };
    loadRecipe();
  }, [recipeId]);

  useEffect(() => {
    if (apiMessage) {
      const timer = setTimeout(() => clearApiMessage(), 5000);
      return () => clearTimeout(timer);
    }
  }, [apiMessage]);

  const handleCookRecipe = () => {
    if (!recipe?.extendedIngredients) return;

    recipe.extendedIngredients.forEach(ing => {
      const missing = isIngredientMissing(ing.name, userPantryNames);
      if (!missing) {
        const userIng = userIngredients.find(
          ui => ui.name.toLowerCase().trim() === ing.name.toLowerCase().trim()
        );
        if (userIng) removeIngredient(userIng.id);
      }
    });

    alert('Ingredients used!');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (apiMessage) {
    return (
      <View style={styles.center}>
        <Text style={{ color: theme.danger, textAlign: 'center' }}>
          {apiMessage}
        </Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  const structuredSteps = recipe.analyzedInstructions?.[0]?.steps ?? [];
  const cleanedSummary = recipe.summary?.replace(/<[^>]+>/g, '') ?? '';
  const cleanedHtmlInstructions = recipe.instructions?.replace(/<[^>]+>/g, '') ?? '';

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
      >
        <View style={styles.heroContainer}>
          <Image source={{ uri: recipe.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{recipe.title}</Text>

            <View style={styles.heroInfoRow}>
              <View style={styles.heroInfoItem}>
                <Image source={timerIcon} style={styles.heroInfoIcon} />
                <Text style={styles.heroInfoText}>{recipe.readyInMinutes} mins</Text>
              </View>

              <View style={styles.heroInfoItem}>
                <Image source={servingsIcon} style={styles.heroInfoIcon} />
                <Text style={styles.heroInfoText}>{recipe.servings} servings</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.contentCard}>
          {cleanedSummary.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.summaryText}>{cleanedSummary}</Text>
            </>
          )}

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.extendedIngredients?.map((ing, index) => {
            const missing = isIngredientMissing(ing.name, userPantryNames);
            return (
              <View key={`${ing.id}-${index}`} style={styles.ingredientRow}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>
                  {ing.amount} {ing.unit} {ing.name}
                </Text>
                {missing && <Image source={missingIcon} style={styles.missingIcon} />}
              </View>
            );
          })}

          <Text style={styles.sectionTitle}>Instructions</Text>
          {structuredSteps.length > 0 ? (
            structuredSteps.map(step => (
              <View key={step.number} style={styles.stepRow}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{step.number}</Text>
                </View>
                <Text style={styles.stepText}>{step.step}</Text>
              </View>
            ))
          ) : cleanedHtmlInstructions ? (
            <Text style={styles.stepText}>{cleanedHtmlInstructions}</Text>
          ) : (
            <Text style={styles.noInstructions}>No instructions available.</Text>
          )}
        </View>
      </ScrollView>

      {cookable && (
        <TouchableOpacity
          onPress={handleCookRecipe}
          style={[styles.cookButton, { bottom: 20 + insets.bottom }]}
        >
          <Text style={styles.cookButtonText}>I am making this</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}