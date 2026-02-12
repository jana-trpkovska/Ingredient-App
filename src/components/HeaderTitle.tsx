import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appConfig from '../../app.json';

export default function HeaderTitle() {
  const navigation = useNavigation<any>();

  const goToHome = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  return (
    <TouchableOpacity onPress={goToHome}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {appConfig.expo.name}
      </Text>
    </TouchableOpacity>
  );
}
