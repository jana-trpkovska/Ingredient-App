import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ingredient } from '../types/ingredient';
import { colors} from '../themes/colors';
import { spacing } from '../themes/spacing';

interface Props {
  ingredient: Ingredient;
  onPress?: () => void;
}

const IngredientCard = ({ ingredient, onPress }: Props) => {
  const { name, image, category, quantity, unit } = ingredient;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 140,
        height: 180,
        marginRight: spacing.sm,
        borderRadius: 8,
        backgroundColor: colors.cardBackground,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.sm,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          backgroundColor: colors.secondaryBackground,
          borderRadius: 40,
          marginBottom: spacing.sm,
          overflow: 'hidden',
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        ) : null}
      </View>

      <Text style={{ fontWeight: 'bold', textAlign: 'center', color: colors.textPrimary }}>
        {name}
      </Text>
      <Text style={{ fontSize: 12, color: colors.textSecondary }}>{category}</Text>
      {quantity !== undefined && (
        <Text style={{ fontSize: 12, color: colors.textPrimary }}>
          {quantity} {unit || ''}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IngredientCard;
