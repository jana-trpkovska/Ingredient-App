import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useIngredientStore } from '../../store/ingredientStore';
import { useUserStore } from '../../store/userStore';
import { IngredientCategory } from '../../types/ingredientCategory';
import { IngredientUnit } from '../../types/ingredientUnit';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './AddIngredient.styles';
import { colors } from '../../themes/colors';

export default function AddIngredientScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { ingredientId } = route.params || {};
  const isEditMode = !!ingredientId;

  const addIngredient = useIngredientStore((state) => state.addIngredient);
  const updateIngredient = useIngredientStore((state) => state.updateIngredient);
  const ingredient = useIngredientStore((state) =>
    state.ingredients.find((i) => i.id === ingredientId)
  );
  const currentUser = useUserStore((state) => state.currentUser);
  const insets = useSafeAreaInsets();

  const [name, setName] = useState(ingredient?.name ?? '');
  const [category, setCategory] = useState<IngredientCategory | null>(
    ingredient?.category ?? null
  );
  const [quantity, setQuantity] = useState<number | null>(ingredient?.quantity ?? null);
  const [unit, setUnit] = useState<IngredientUnit | ''>(ingredient?.unit ?? '');
  const [image, setImage] = useState<string | null>(ingredient?.image ?? null);

  useEffect(() => {
    if (isEditMode && !ingredient) {
      Alert.alert('Error', 'Ingredient not found');
      navigation.goBack();
    }
  }, [ingredient]);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!cameraStatus.granted || !libraryStatus.granted) {
        Alert.alert(
          'Permission required',
          'Camera and media library access are required to add ingredient images.'
        );
        return false;
      }
    }
    return true;
  };

  const pickImageFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter the ingredient name.');
      return;
    }

    if (!category) {
      Alert.alert('Validation', 'Please select a category.');
      return;
    }

    if (!currentUser) {
      Alert.alert('Error', 'No user logged in.');
      return;
    }

    if (isEditMode && ingredient) {
      updateIngredient({
        ...ingredient,
        name,
        category,
        quantity: quantity ?? undefined,
        unit: unit || undefined,
        image: image ?? undefined,
      });
    } else {
      addIngredient({
        name,
        category,
        quantity: quantity ?? undefined,
        unit: unit || undefined,
        image: image ?? undefined
      });
    }

    navigation.goBack();
  };

  const isSubmitDisabled = !name.trim() || !category;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + 10,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Add Ingredient</Text>

            <Text style={styles.label}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g., Tomato"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>Category</Text>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(val) => setCategory(val)}
                style={{ flex: 1, color: colors.textSecondary }}
              >
                <Picker.Item label="Select category" value={null} />
                {Object.values(IngredientCategory).map((cat) => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Quantity</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={quantity !== null ? String(quantity) : ''}
                onChangeText={(text) => setQuantity(Number(text))}
                placeholder="e.g., 3"
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.label}>Unit</Text>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={unit}
                onValueChange={(val) => setUnit(val)}
                style={{ flex: 1, color: colors.textSecondary }}
              >
                <Picker.Item label="Select unit" value="" />
                {Object.values(IngredientUnit).map((u) => (
                  <Picker.Item key={u} label={u} value={u} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Image</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={pickImageFromCamera}
              >
                <Text style={styles.primaryButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={pickImageFromGallery}
              >
                <Text style={styles.primaryButtonText}>Pick from Gallery</Text>
              </TouchableOpacity>
            </View>

            {image && (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            )}

            <TouchableOpacity
              style={[styles.primaryButton, { marginTop: 20 }]}
              onPress={handleSubmit}
              disabled={isSubmitDisabled}
            >
              <Text style={styles.primaryButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
