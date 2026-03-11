import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useUserStore } from '../../store/userStore';
import { updateUser } from '../../services/userService';
import { createStyles } from './EditProfile.styles';
import userIconLight from '../../assets/avatar.png';
import userIconDark from '../../assets/avatar_dark_mode.png';
import { Picker } from '@react-native-picker/picker';
import { Diet } from '../../types/diet';
import { useTheme } from '../../hooks/useTheme';
import CustomAlert from '../../components/modals/CustomAlert';

export default function EditProfileScreen({ navigation }: any) {
  const { currentUser, setCurrentUser } = useUserStore();

  const [fullName, setFullName] = useState('');
  const [diet, setDiet] = useState<Diet | null>(null);

  const { theme, isDark } = useTheme();
  const styles = createStyles(theme);
  const avatarSource = isDark ? userIconDark : userIconLight;

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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
      setAlertTitle('Error');
      setAlertMessage('Full name cannot be empty');
      setAlertVisible(true);
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
      navigation.goBack();
    } catch (error) {
      setAlertTitle('Error');
      setAlertMessage('Failed to update profile');
      setAlertVisible(true);
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

          <View style={styles.header} />

          <Image source={avatarSource} style={styles.avatar} />

          <Text style={styles.title}>Edit Profile</Text>

          <View style={styles.card}>

            <Text style={styles.label}>Full Name</Text>

            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              placeholderTextColor={theme.textSecondary}
              style={styles.input}
            />

            <View style={styles.divider} />

            <Text style={styles.label}>Diet Preference</Text>

            <Picker
              selectedValue={diet}
              onValueChange={(val) => setDiet(val)}
              style={styles.picker}
            >
              <Picker.Item label="Select diet" value={null} />
              {Object.values(Diet).map((d) => (
                <Picker.Item key={d} label={d} value={d} />
              ))}
            </Picker>

          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSave}
          >
            <Text style={styles.primaryButtonText}>Save Changes</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}