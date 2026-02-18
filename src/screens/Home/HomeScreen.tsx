import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import IngredientCard from '../../components/IngredientCard';
import { useIngredientStore } from '../../store/ingredientStore';
import { useUserStore } from '../../store/userStore';
import { styles } from './Home.styles';

export default function HomeScreen({ navigation }: any) {
  const ingredients = useIngredientStore((state) => state.ingredients);
  const currentUser = useUserStore((state) => state.currentUser);
  const loadIngredients = useIngredientStore((state) => state.fetchIngredients);

  useEffect(() => {
  if (currentUser) {
    loadIngredients();
  }
}, [currentUser]);

  const handleAddIngredient = () => {
    navigation.navigate('AddIngredient');
  };

  const renderContent = () => {
    if (!currentUser) {
      return (
        <View>
          <Text style={styles.message}>Login to view your ingredients.</Text>
        </View>
      );
    }

    if (ingredients.length === 0) {
      return (
        <View>
          <Text style={styles.message}>Add ingredients to see them here.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <IngredientCard
            ingredient={item}
            onPress={() =>
                navigation.navigate('IngredientDetails', {
                ingredientId: item.id,
              })
            }
          />
        )}
      />
    );
};

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, paddingBottom: 80 }}>
        <Text style={styles.title}>Your Ingredients</Text>
        {renderContent()}
      </View>

      {currentUser && (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={handleAddIngredient}
        >
          <Text style={styles.fixedButtonText}>Add Ingredient</Text>
        </TouchableOpacity>
    )}
    </View>
  );
}
