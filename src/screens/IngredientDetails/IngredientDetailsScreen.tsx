import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useIngredientStore } from '../../store/ingredientStore';
import { styles } from './IngredientDetails.styles';

export default function IngredientDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { ingredientId } = route.params;

  const ingredient = useIngredientStore((state) =>
    state.ingredients.find((i) => i.id === ingredientId)
  );

  if (!ingredient) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>
          Ingredient not found.
        </Text>
      </View>
    );
  }

  const { name, image, category, quantity, unit } = ingredient;

    return (
    <View style={styles.container}>
        <View style={styles.content}>
        <View style={styles.imageContainer}>
            {image ? (
            <Image source={{ uri: image }} style={styles.image} />
            ) : (
            <View style={styles.imagePlaceholder} />
            )}
        </View>

        <View style={styles.infoCard}>
            <Text style={styles.name}>{name}</Text>

            <View style={styles.row}>
            <Text style={styles.label}>Category</Text>
            <Text style={styles.value}>{category}</Text>
            </View>

            <View style={styles.row}>
            <Text style={styles.label}>Quantity</Text>
            <Text style={styles.value}>
                {quantity ?? '-'} {unit ?? ''}
            </Text>
            </View>
        </View>
        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
            navigation.navigate('AddIngredient', { ingredientId })
            }
        >
            <Text style={styles.primaryButtonText}>Edit Ingredient</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.outlineButtonText}>Back</Text>
        </TouchableOpacity>
        </View>
    </View>
    );
}