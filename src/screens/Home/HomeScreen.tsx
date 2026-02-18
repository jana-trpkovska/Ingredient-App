import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import IngredientCard from '../../components/IngredientCard';
import { useIngredientStore } from '../../store/ingredientStore';
import { useUserStore } from '../../store/userStore';
import { styles } from './Home.styles';
import { IngredientCategory } from '../../types/ingredientCategory';

const CATEGORY_FILTERS = [
  { label: IngredientCategory.PRODUCE, image: require('../../assets/produce.png') },
  { label: IngredientCategory.PROTEIN, image: require('../../assets/protein.png') },
  { label: IngredientCategory.DAIRY, image: require('../../assets/dairy.png') },
  { label: IngredientCategory.GRAINS, image: require('../../assets/grains.png') },
  { label: IngredientCategory.SWEETS, image: require('../../assets/sweets.png') },
  { label: IngredientCategory.OTHER, image: require('../../assets/other_ingredients.png') },
];

export default function HomeScreen({ navigation }: any) {
  const ingredients = useIngredientStore((state) => state.ingredients);
  const loadIngredients = useIngredientStore((state) => state.fetchIngredients);
  const currentUser = useUserStore((state) => state.currentUser);

  const [selectedCategory, setSelectedCategory] =
    useState<IngredientCategory | null>(null);

  useEffect(() => {
    if (currentUser) {
      loadIngredients();
    }
  }, [currentUser]);

  const handleAddIngredient = () => {
    navigation.navigate('AddIngredient');
  };

  const filteredIngredients = selectedCategory
    ? ingredients.filter((i) => i.category === selectedCategory)
    : ingredients;

  const renderContent = () => {
    if (!currentUser) {
      return (
        <Text style={[styles.message]}>
          Login to view your ingredients.
        </Text>
      );
    }

    return (
      <FlatList
        data={filteredIngredients}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.message}>
            {ingredients.length === 0
              ? 'Add ingredients to see them here.'
              : 'No ingredients found for this category.'}
          </Text>
        }
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
      <Text style={styles.title}>Your Ingredients</Text>

      {currentUser && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {CATEGORY_FILTERS.map((category) => {
            const isSelected = selectedCategory === category.label;

            return (
              <TouchableOpacity
                key={category.label}
                style={styles.categoryItem}
                onPress={() =>
                  setSelectedCategory(
                    isSelected ? null : category.label
                  )
                }
              >
                <Image
                  source={category.image}
                  style={[
                    styles.categoryImage,
                    isSelected && styles.categoryImageSelected,
                  ]}
                />
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {renderContent()}

      {currentUser && (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={handleAddIngredient}
        >
          <Text style={styles.fixedButtonText}>
            Add Ingredient
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
