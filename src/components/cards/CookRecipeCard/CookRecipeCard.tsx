import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { createStyles } from "./CookRecipeCard.styles";
import placeholderImage from '../../../../assets/images/placeholder_recipe.jpg';

type Props = {
  title: string;
  image?: string;
  cookable: boolean;
  onPress: () => void;
  onRemove: () => void;
};

export default function CookRecipeCard({ title, image, cookable, onPress, onRemove }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [imageError, setImageError] = useState(false);
  const imageSource = !imageError && image ? { uri: image } : placeholderImage;

  return (
    <TouchableOpacity
      style={[styles.card, !cookable && styles.cardDisabled]}
      onPress={onPress}
    >
      <Image
        source={imageSource}
        style={[styles.image, !cookable && { opacity: 0.4 }]}
        onError={() => setImageError(true)}
      />

      <View style={styles.info}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text
              style={[styles.title, !cookable && { color: theme.textSecondary }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>

          <TouchableOpacity onPress={onRemove}>
            <Image source={require("../../../../assets/images/delete.png")} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>

        {!cookable && <Text style={styles.missingText}>Missing ingredients</Text>}
      </View>
    </TouchableOpacity>
  );
}