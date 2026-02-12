import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

interface Props {
  name: string;
  amount?: string;
  imageUri?: string;
  onPress?: () => void;
}

const IngredientCard = ({ name, amount, imageUri, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 120,
        height: 150,
        marginRight: 12,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,
          backgroundColor: '#ddd',
          borderRadius: 40,
          marginBottom: 8,
        }}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        ) : null}
      </View>
      <Text>{name}</Text>
      {amount && <Text>{amount}</Text>}
    </TouchableOpacity>
  );
};

export default IngredientCard;
