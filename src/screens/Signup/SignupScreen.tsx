import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../store/userStore';
import { addUser } from '../../services/userService';
import { User } from '../../types/user';
import { v4 as uuidv4 } from 'uuid';
import { authStyles as styles } from '../../themes/auth.styles';
import { colors } from '../../themes/colors';
import icon from '../../../assets/icon.png'

export default function SignupScreen({ navigation }: any) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const { setCurrentUser } = useUserStore();

  const handleSignup = () => {
    if (!fullName || !username || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const newUser: User = {
      id: uuidv4(),
      fullName,
      username,
      password,
    };

    try {
      addUser(newUser);
      setCurrentUser(newUser);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Username already exists or invalid input');
    }
  };

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
        <Image
          source={icon}
          style={styles.logo}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={colors.textSecondary}
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            placeholderTextColor={colors.textSecondary}
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={colors.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureConfirm}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
            <Ionicons
              name={secureConfirm ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSignup}
        >
          <Text style={styles.primaryButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}