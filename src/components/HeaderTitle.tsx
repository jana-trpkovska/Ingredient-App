import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appConfig from '../../app.json';
import { colors} from '../themes/colors';
import { spacing } from '../themes/spacing';

export default function HeaderTitle() {
  const navigation = useNavigation<any>();

  const goToHome = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  return (
    <TouchableOpacity onPress={goToHome}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: colors.textPrimary,
          paddingHorizontal: spacing.sm,
        }}
      >
        {appConfig.expo.name}
      </Text>
    </TouchableOpacity>
  );
}
