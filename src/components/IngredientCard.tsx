import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ingredient } from '../types/ingredient';

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
        marginRight: 12,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          backgroundColor: '#ddd',
          borderRadius: 40,
          marginBottom: 8,
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

      <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{name}</Text>
      <Text style={{ fontSize: 12, color: '#666' }}>{category}</Text>
      {quantity !== undefined && (
        <Text style={{ fontSize: 12, color: '#333' }}>
          {quantity} {unit || ''}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IngredientCard;
