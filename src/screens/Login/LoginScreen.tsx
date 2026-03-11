import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../store/userStore';
import { getUserByUsername } from '../../services/userService';
import { createStyles } from '../../themes/auth.styles';
import icon from '../../../assets/images/icon.png';
import { useTheme } from '../../hooks/useTheme';
import CustomAlert from '../../components/modals/CustomAlert/CustomAlert';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const { setCurrentUser, setUserId } = useUserStore();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setAlertTitle('Error');
      setAlertMessage('Please fill in all fields');
      setAlertVisible(true);
      return;
    }

    const user = getUserByUsername(username.trim());

    if (!user) {
      setAlertTitle('Error');
      setAlertMessage('User does not exist');
      setAlertVisible(true);
      return;
    }

    if (user.password.trim() !== password.trim()) {
      setAlertTitle('Error');
      setAlertMessage('Incorrect password');
      setAlertVisible(true);
      return;
    }

    setUserId(user.id);
    setCurrentUser(user);
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
          <Image source={icon} style={styles.logo} />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={theme.textSecondary}
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Ionicons
                name={secure ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={theme.textSecondary}
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

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}