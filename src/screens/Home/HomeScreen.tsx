import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import IngredientCard from '../../components/IngredientCard';
import { useIngredientStore } from '../../store/ingredientStore';
import { styles } from './Home.styles';


export default function HomeScreen() {
  const ingredients = useIngredientStore((state) => state.ingredients);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Ingredients</Text>

      <FlatList
        data={ingredients}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <IngredientCard
            ingredient={item}
            onPress={() => console.log('Pressed', item.name)}
          />
        )}
      />
    </View>
  );
}