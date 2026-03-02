import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useUserStore } from '../../store/userStore';
import { updateUser } from '../../services/userService';
import { styles } from './EditProfile.styles';
import userIcon from '../../assets/avatar.png';
import { colors } from '../../themes/colors';
import { Picker } from '@react-native-picker/picker';
import { Diet } from '../../types/diet';

export default function EditProfileScreen({ navigation }: any) {
  const { currentUser, setCurrentUser } = useUserStore();
  const [fullName, setFullName] = useState('');
  const [diet, setDiet] = useState<Diet | null>(null);

  useEffect(() => {
    if (!currentUser) {
      navigation.replace('Login');
      return;
    }

    setFullName(currentUser.fullName);
    setDiet(currentUser.diet ?? null);
  }, [currentUser]);

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Full name cannot be empty');
      return;
    }

    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      fullName: fullName.trim(),
      diet: diet ?? undefined,
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
            <Picker
              selectedValue={diet}
              onValueChange={(val) => setDiet(val)}
              style={{ flex: 1, color: colors.textSecondary }}
            >
              <Picker.Item label="Select diet" value={null} />
              {Object.values(Diet).map((d) => (
                <Picker.Item key={d} label={d} value={d} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, { marginTop: 20 }]}
            onPress={handleSave}
          >
            <Text style={styles.primaryButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}