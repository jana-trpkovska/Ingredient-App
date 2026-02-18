import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Ingredient } from '../types/ingredient';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import { useIngredientStore } from '../store/ingredientStore';
import deleteImage from '../assets/delete.png'
import placeholderImage from '../assets/placeholder_ingredient.png'

interface Props {
  ingredient: Ingredient;
  onPress?: () => void;
}

const IngredientCard = ({ ingredient, onPress }: Props) => {
  const { id, name, image, category, quantity, unit } = ingredient;
  const deleteIngredient = useIngredientStore((state) => state.removeIngredient);

  const handleDelete = () => {
    Alert.alert(
      'Delete Ingredient',
      `Are you sure you want to delete ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteIngredient(id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        marginBottom: spacing.md,
        borderRadius: 12,
        backgroundColor: colors.cardBackground,
        shadowColor: colors.black,
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: colors.secondaryBackground,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          marginRight: spacing.md,
        }}
      >
        <Image source={image ? { uri: image } : placeholderImage} style={{ width: 60, height: 60 }} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: colors.textPrimary,
            marginBottom: 2,
          }}
        >
          {name}
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: colors.textSecondary,
            marginBottom: 4,
          }}
        >
          {category}
        </Text>

        {quantity !== undefined && (
          <Text style={{ fontSize: 13, color: colors.textPrimary }}>
            {quantity} {unit || ''}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={handleDelete}
        style={{
          padding: spacing.sm,
        }}
      >
        <Image
          source={deleteImage}
          style={{
            width: 25,
            height: 25,
          }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default IngredientCard;
