import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useUserStore } from '../../store/userStore';
import { createStyles } from './Profile.styles';
import userIconLight from '../../assets/avatar.png';
import userIconDark from '../../assets/avatar_dark_mode.png'
import { useTheme } from '../../hooks/useTheme';

export default function ProfileScreen({ navigation }: any) {
  const { currentUser, setCurrentUser } = useUserStore();

  const { theme, isDark } = useTheme();
  const styles = createStyles(theme);
  const avatarSource = isDark ? userIconDark : userIconLight;

  useEffect(() => {
    if (!currentUser) {
      navigation.replace('Login');
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Redirecting to login...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.header} />

      <Image source={avatarSource} style={styles.avatar} />

      <Text style={styles.name}>{currentUser.fullName}</Text>
      <Text style={styles.username}>@{currentUser.username.trim()}</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Username</Text>
          <Text style={styles.infoValue}>
            {currentUser.username.trim()}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Diet Preference</Text>
          <Text style={styles.infoValue}>
            {currentUser.diet?.trim() ? currentUser.diet.trim() : 'Not set'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.primaryButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setCurrentUser(null)}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}