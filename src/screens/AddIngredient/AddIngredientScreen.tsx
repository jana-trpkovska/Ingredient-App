import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useIngredientStore } from '../../store/ingredientStore';
import { useUserStore } from '../../store/userStore';
import { IngredientCategory, IngredientUnit } from '../../types/ingredient';
import * as ImagePicker from 'expo-image-picker';
import { createStyles } from './AddIngredient.styles';
import { useTheme } from '../../hooks/useTheme';
import CustomAlert from '../../components/modals/CustomAlert/CustomAlert';
import CustomSelect from '../../components/modals/CustomSelect/CustomSelect';

export default function AddIngredientScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
  const [category, setCategory] = useState<IngredientCategory | null>(ingredient?.category ?? null);
  const [quantity, setQuantity] = useState<number | null>(ingredient?.quantity ?? null);
  const [unit, setUnit] = useState<IngredientUnit | ''>(ingredient?.unit ?? '');
  const [image, setImage] = useState<string | null>(ingredient?.image ?? null);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');

  useEffect(() => {
    if (isEditMode && !ingredient) {
      setAlertTitle('Error');
      setAlertMessage('Ingredient not found');
      setAlertVisible(true);
    }
  }, [ingredient]);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!cameraStatus.granted || !libraryStatus.granted) {
        setAlertTitle('Permission Required');
        setAlertMessage('Camera and media library access are required to add ingredient images');
        setAlertVisible(true);
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
      setAlertTitle('Validation');
      setAlertMessage('Please enter the ingredient name');
      setAlertVisible(true);
      return;
    }
    if (!category) {
      setAlertTitle('Validation');
      setAlertMessage('Please select a category');
      setAlertVisible(true);
      return;
    }
    if (!currentUser) {
      setAlertTitle('Error');
      setAlertMessage('No user logged in');
      setAlertVisible(true);
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
        image: image ?? undefined,
      });
    }

    navigation.goBack();
  };

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
                placeholder="e.g., Tomatoes"
                placeholderTextColor={theme.textSecondary}
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>Category</Text>
            <CustomSelect
              options={[
                { label: 'Select category', value: null },
                ...Object.values(IngredientCategory).map((cat) => ({ label: cat, value: cat })),
              ]}
              selectedValue={category}
              onValueChange={setCategory}
              placeholder="Select category"
            />

            <Text style={styles.label}>Quantity</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={quantity !== null ? String(quantity) : ''}
                onChangeText={(text) => setQuantity(Number(text))}
                placeholder="e.g., 3"
                placeholderTextColor={theme.textSecondary}
                style={styles.input}
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.label}>Unit</Text>
            <CustomSelect
              options={[
                { label: 'Select unit', value: '' },
                ...Object.values(IngredientUnit).map((u) => ({ label: u, value: u })),
              ]}
              selectedValue={unit}
              onValueChange={setUnit}
              placeholder="Select unit"
            />

            <Text style={styles.label}>Image</Text>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
              <TouchableOpacity style={styles.secondaryButton} onPress={pickImageFromCamera}>
                <Text style={styles.primaryButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} onPress={pickImageFromGallery}>
                <Text style={styles.primaryButtonText}>Pick from Gallery</Text>
              </TouchableOpacity>
            </View>

            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

            <TouchableOpacity style={[styles.primaryButton, { marginTop: 20 }]} onPress={handleSubmit}>
              <Text style={styles.primaryButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
}