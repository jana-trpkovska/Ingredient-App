import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './Settings.styles';
import { useTheme } from '../../hooks/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ setOnboardingSeen }: any) {
  const navigation = useNavigation<any>();
  const { isDark, toggleTheme } = useTheme();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleReplayOnboarding = async () => {
    try {
      await AsyncStorage.setItem('onboardingSeen', 'false');
      setOnboardingSeen(false);
    } catch (error) {
      console.log('Error replaying onboarding:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowLabel}>Dark Mode</Text>
              <Text style={styles.rowSubtitle}>View the app in dark mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.settingsTrackColor, true: theme.primary }}
              thumbColor={theme.settingsThumbColor}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.rowLeft}>
              <Text style={styles.rowLabel}>Profile</Text>
              <Text style={styles.rowSubtitle}>Manage your personal information</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={handleReplayOnboarding}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowLabel}>Replay Onboarding</Text>
              <Text style={styles.rowSubtitle}>See the introduction screens again</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowLabel}>Version</Text>
              <Text style={styles.rowSubtitle}>Current application version</Text>
            </View>
            <Text style={styles.version}>1.0</Text>
          </View>
        </View>
      </View>
    </View>
  );
}