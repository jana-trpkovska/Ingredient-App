import React from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { OnboardingItemData } from './onboardingData';
import { createOnboardingStyles } from './Onboarding.styles';

const { width, height } = Dimensions.get('window');

interface Props {
  item: OnboardingItemData;
}

export default function OnboardingItem({ item }: Props) {
  const { theme } = useTheme();
  const styles = createOnboardingStyles(theme);

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.Image
        source={item.image}
        style={styles.image}
        entering={FadeInUp.duration(800)}
      />

      <Animated.Text
        style={[styles.title]}
        entering={FadeInUp.delay(200).duration(800)}
      >
        {item.title}
      </Animated.Text>

      <Animated.Text
        style={[styles.description]}
        entering={FadeInUp.delay(400).duration(800)}
      >
        {item.description}
      </Animated.Text>
    </View>
  );
}