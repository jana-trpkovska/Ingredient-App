import { View, Text, FlatList } from 'react-native';
import React from 'react';
import IngredientCard from '../../components/IngredientCard';
import { useIngredientStore } from '../../store/ingredientStore';

export default function HomeScreen() {
  const ingredients = useIngredientStore((state) => state.ingredients);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>Your Ingredients</Text>

      <FlatList
        data={ingredients}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <IngredientCard
            ingredient={item} // pass the full ingredient object
            onPress={() => console.log('Pressed', item.name)}
          />
        )}
      />
    </View>
  );
}
