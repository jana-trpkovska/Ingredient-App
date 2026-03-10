import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, useAnimatedScrollHandler } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingItem from './OnboardingItem';
import { ONBOARDING_DATA } from './onboardingData';
import { useTheme } from '../../hooks/useTheme';
import { createOnboardingStyles } from './Onboarding.styles';
import { CommonActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const AnimatedFlatList = Animated.FlatList;

export default function OnboardingScreen({ navigation, onFinish }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<Animated.FlatList>(null);
  const { theme } = useTheme();
  const styles = createOnboardingStyles(theme);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleFinish = async () => {
    await AsyncStorage.setItem('onboardingSeen', 'true');
    onFinish?.();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      })
    );
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const renderItem = ({ item }: any) => <OnboardingItem item={item} />;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      <View style={{ width: '100%', alignItems: 'center', paddingTop: 20 }}>
        <AnimatedFlatList
          data={ONBOARDING_DATA}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          ref={flatListRef}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={{ maxHeight: height * 0.7 }}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />

        <View style={[styles.paginationContainer, { marginTop: 10 }]}>
          {ONBOARDING_DATA.map((_, index) => {
            const animatedStyle = useAnimatedStyle(() => {
              const scale = interpolate(scrollX.value / width, [index - 1, index, index + 1], [0.8, 1.4, 0.8], 'clamp');
              return { transform: [{ scale }] };
            });
            return <Animated.View key={index.toString()} style={[styles.dot, animatedStyle]} />;
          })}
        </View>
      </View>

      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>
          {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}