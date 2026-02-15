import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useUserStore } from '../../store/userStore';
import { styles } from '../Profile/Profile.styles';
import userIcon from '../../assets/avatar.png';

export default function ProfileScreen({ navigation }: any) {
  const { currentUser, setCurrentUser } = useUserStore();

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
      <Text style={styles.title}>User Profile</Text>

        <Image
          source={userIcon}
          style={styles.avatar}
        />

        <Text style={styles.name}>{currentUser.fullName}</Text>

        <Text style={styles.username}>
          Username: {currentUser.username.trim()}
        </Text>

        <Text style={styles.diet}>
          Diet: {currentUser.diet?.trim() ? currentUser.diet.trim() : 'undefined'}
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.primaryButtonText}>
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => setCurrentUser(null)}
        >
          <Text style={styles.outlineButtonText}>
            Logout
          </Text>
        </TouchableOpacity>
    </View>
  );
}
