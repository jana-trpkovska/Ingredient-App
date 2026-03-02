import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRecipeStore } from '../../store/recipeStore';
import { DetailedRecipe } from '../../types/recipe';
import { styles } from './DetailedRecipe.styles';
import { colors } from '../../themes/colors';
import timerIcon from '../../assets/timer.png'
import servingsIcon from '../../assets/servings.png'

export default function DetailedRecipeScreen() {
  const route = useRoute<any>();
  const { recipeId } = route.params;

  const getRecipeDetailsById = useRecipeStore(
    (state) => state.getRecipeDetailsById
  );

  const [recipe, setRecipe] = useState<DetailedRecipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      const data = await getRecipeDetailsById(recipeId);
      setRecipe(data);
      setLoading(false);
    };

    loadRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
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

  const structuredSteps =
    recipe.analyzedInstructions?.[0]?.steps ?? [];

  const cleanedSummary =
    recipe.summary?.replace(/<[^>]+>/g, '') ?? '';

  const cleanedHtmlInstructions =
    recipe.instructions?.replace(/<[^>]+>/g, '') ?? '';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.heroContainer}>
        <Image source={{ uri: recipe.image }} style={styles.heroImage} />
        <View style={styles.heroOverlay} />

        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>{recipe.title}</Text>

          <View style={styles.heroInfoRow}>
            <View style={styles.heroInfoItem}>
              <Image source={timerIcon} style={styles.heroInfoIcon} />
              <Text style={styles.heroInfoText}>
                {recipe.readyInMinutes} mins
              </Text>
            </View>

            <View style={styles.heroInfoItem}>
              <Image source={servingsIcon} style={styles.heroInfoIcon} />
              <Text style={styles.heroInfoText}>
                {recipe.servings} servings
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.contentCard}>

        {cleanedSummary.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.summaryText}>
              {cleanedSummary}
            </Text>
          </>
        )}

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipe.extendedIngredients?.map((ing) => (
          <View key={ing.id} style={styles.ingredientRow}>
            <View style={styles.bullet} />
            <Text style={styles.ingredientText}>
              {ing.amount} {ing.unit} {ing.name}
            </Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>

        {structuredSteps.length > 0 ? (
          structuredSteps.map((step) => (
            <View key={step.number} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>
                  {step.number}
                </Text>
              </View>
              <Text style={styles.stepText}>
                {step.step}
              </Text>
            </View>
          ))
        ) : cleanedHtmlInstructions ? (
          <Text style={styles.stepText}>
            {cleanedHtmlInstructions}
          </Text>
        ) : (
          <Text style={styles.noInstructions}>
            No instructions available.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}