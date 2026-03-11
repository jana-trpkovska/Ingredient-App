import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import IngredientCard from '../../components/cards/IngredientCard';
import { useIngredientStore } from '../../store/ingredientStore';
import { useUserStore } from '../../store/userStore';
import { createStyles } from './Home.styles';
import { IngredientCategory } from '../../types/ingredient';
import { useTheme } from '../../hooks/useTheme';
import emptyStateImgLight from '../../../assets/images/home_empty_state_light.png';
import emptyStateImgDark from '../../../assets/images/home_empty_state_dark.png';
import noIngredientsImg from '../../../assets/images/no_ingredients.png';

const CATEGORY_FILTERS = [
  { label: IngredientCategory.PRODUCE, image: require('../../../assets/images/produce.png') },
  { label: IngredientCategory.PROTEIN, image: require('../../../assets/images/protein.png') },
  { label: IngredientCategory.DAIRY, image: require('../../../assets/images/dairy.png') },
  { label: IngredientCategory.GRAINS, image: require('../../../assets/images/grains.png') },
  { label: IngredientCategory.SWEETS, image: require('../../../assets/images/sweets.png') },
  { label: IngredientCategory.OTHER, image: require('../../../assets/images/other_ingredients.png') },
];

export default function HomeScreen({ navigation }: any) {
  const ingredients = useIngredientStore((state) => state.ingredients);
  const currentUser = useUserStore((state) => state.currentUser);

  const [selectedCategory, setSelectedCategory] = useState<IngredientCategory | null>(null);

  const { theme, isDark } = useTheme();
  const styles = createStyles(theme);

  const handleAddIngredient = () => {
    navigation.navigate('AddIngredient');
  };

  const filteredIngredients = selectedCategory
    ? ingredients.filter((i) => i.category === selectedCategory)
    : ingredients;

  const renderContent = () => {
    if (!currentUser) {
      return (
        <Text style={styles.message}>Login to view your ingredients.</Text>
      );
    }

    const emptyStateImg = isDark ? emptyStateImgDark : emptyStateImgLight;

    if (ingredients.length === 0 || filteredIngredients.length === 0) {
      const isFridgeEmpty = ingredients.length === 0;

      return (
        <View style={styles.contentWrapper}>
          <View style={styles.emptyContainer}>
            <Image
              source={isFridgeEmpty ? emptyStateImg : noIngredientsImg}
              style={isFridgeEmpty ? styles.emptyImage : styles.categoryEmptyImage}
            />

            <Text style={styles.emptyTitle}>
              {isFridgeEmpty ? 'Your fridge is empty' : 'No ingredients found'}
            </Text>

            <Text style={styles.emptySubtitle}>
              {isFridgeEmpty
                ? 'Start adding ingredients to keep track of what you have at home.'
                : 'There are no ingredients in this category yet.'}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredIngredients}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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

      {currentUser && ingredients.length > 0 && (
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
                  setSelectedCategory(isSelected ? null : category.label)
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
        <TouchableOpacity style={styles.fixedButton} onPress={handleAddIngredient}>
          <Text style={styles.fixedButtonText}>Add Ingredient</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}