import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useUserStore } from '../../store/userStore';
import { updateUser } from '../../services/userService';
import { styles } from './EditProfile.styles';
import userIcon from '../../assets/avatar.png';
import { colors } from '../../themes/colors';

export default function EditProfileScreen({ navigation }: any) {
  const { currentUser, setCurrentUser } = useUserStore();
  const [fullName, setFullName] = useState('');
  const [diet, setDiet] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigation.replace('Login');
      return;
    }
    setFullName(currentUser.fullName);
    setDiet(currentUser.diet ?? '');
  }, [currentUser]);

  const handleSave = () => {
    if (!fullName) {
      Alert.alert('Error', 'Full name cannot be empty');
      return;
    }

    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      fullName,
      diet,
    };

    try {
      updateUser(updatedUser);
      setCurrentUser(updatedUser);
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  if (!currentUser) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Redirecting to login...</Text>
      </View>
    );
  }

  return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
  >
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
        <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Image source={userIcon} style={styles.avatar} />

      <Text style={styles.label}>Full Name</Text>
      <View style={styles.inputContainer}>
        <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
      </View>

      <Text style={styles.label}>Diet</Text>
      <View style={styles.inputContainer}>
        <TextInput
        value={diet}
        onChangeText={setDiet}
        placeholder="Diet (optional)"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
        <Text style={styles.primaryButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}
