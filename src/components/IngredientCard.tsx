import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ingredient } from '../types/ingredient';
import { spacing } from '../themes/spacing';
import { useIngredientStore } from '../store/ingredientStore';
import deleteImage from '../assets/delete.png';
import placeholderImage from '../assets/placeholder_ingredient.png';
import { useTheme } from '../hooks/useTheme';
import CustomAlert from '../components/modals/CustomAlert';

interface Props {
  ingredient: Ingredient;
  onPress?: () => void;
}

const IngredientCard = ({ ingredient, onPress }: Props) => {
  const { id, name, image, category, quantity, unit } = ingredient;
  const deleteIngredient = useIngredientStore((state) => state.removeIngredient);
  const { theme } = useTheme();

  const [alertVisible, setAlertVisible] = useState(false);

  const handleDelete = () => {
    setAlertVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: spacing.md,
          marginBottom: spacing.md,
          borderRadius: 12,
          backgroundColor: theme.cardBackground,
          shadowColor: theme.textPrimary,
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
            backgroundColor: theme.secondaryBackground,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            marginRight: spacing.md,
          }}
        >
          <Image
            source={image ? { uri: image } : placeholderImage}
            style={{ width: 60, height: 60 }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.textPrimary,
              marginBottom: 2,
            }}
          >
            {name}
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: theme.textSecondary,
              marginBottom: 4,
            }}
          >
            {category}
          </Text>

          {quantity !== undefined && (
            <Text style={{ fontSize: 13, color: theme.textPrimary }}>
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

      <CustomAlert
        visible={alertVisible}
        title="Delete Ingredient"
        message={`Are you sure you want to delete ${name}?`}
        buttons={[
          {
            text: 'Cancel',
            onPress: () => setAlertVisible(false),
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              deleteIngredient(id);
              setAlertVisible(false);
            },
            style: 'destructive',
          },
        ]}
      />
    </>
  );
};

export default IngredientCard;