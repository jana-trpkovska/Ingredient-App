import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { createStyles } from "./SelectableIngredientCard.styles";

type Props = {
  name: string;
  image?: string | null;
  selected: boolean;
  onPress: () => void;
};

export default function SelectableIngredientCard({ name, image, selected, onPress }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
    >
      <Image
        source={image ? { uri: image } : require("../../../../assets/images/placeholder_ingredient.png")}
        style={styles.image}
      />
      <Text style={[styles.text, selected && styles.textSelected]}>{name}</Text>
    </TouchableOpacity>
  );
}