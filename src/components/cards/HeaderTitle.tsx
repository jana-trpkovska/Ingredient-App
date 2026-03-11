import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appConfig from '../../../app.json';
import { useTheme } from '../../hooks/useTheme';

export default function HeaderTitle() {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  const goToHome = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  return (
    <TouchableOpacity onPress={goToHome}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: theme.headerColor,
          paddingHorizontal: 8,
        }}
      >
        {appConfig.expo.name}
      </Text>
    </TouchableOpacity>
  );
}
