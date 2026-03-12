import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../hooks/useTheme";
import { createStyles } from "./SearchResultRecipeCard.styles";
import { IngredientSearchRecipe } from "../../../types/recipe";
import placeholderImage from '../../../../assets/images/placeholder_recipe.jpg';

type Props = {
  recipe: IngredientSearchRecipe;
  saved: boolean;
  onPress: () => void;
  onToggleSave: () => void;
};

export default function SearchResultRecipeCard({ recipe, saved, onPress, onToggleSave }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [imageError, setImageError] = useState(false);
  const imageSource = !imageError && recipe.image ? { uri: recipe.image } : placeholderImage;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={imageSource}
        style={styles.image}
        onError={() => setImageError(true)}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.subtitle}>
          Used: {recipe.usedIngredientCount} | Missing: {recipe.missedIngredientCount}
        </Text>
        <TouchableOpacity style={styles.saveButton} onPress={onToggleSave}>
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
}