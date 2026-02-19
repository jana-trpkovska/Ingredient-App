import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../store/userStore';
import { getUserByUsername } from '../../services/userService';
import { authStyles as styles } from '../../themes/auth.styles';
import { colors } from '../../themes/colors';
import icon from '../../../assets/icon.png'

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const { setCurrentUser } = useUserStore();

  const handleLogin = () => {
    const user = getUserByUsername(username.trim());
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!user) {
      Alert.alert('Error', 'User does not exist');
      return;
    }
    if (user.password.trim() !== password.trim()) {
      Alert.alert('Error', 'Incorrect password');
      return;
    }
    setCurrentUser(user);
    navigation.goBack();
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

      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Signup')}
        >
          Sign Up
        </Text>
      </Text>
    </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}

