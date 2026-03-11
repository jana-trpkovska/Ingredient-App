import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../types/Theme';

const { width, height } = Dimensions.get('window');

export const createOnboardingStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.background,
      paddingTop: 40,
    },

    image: {
      width: width * 0.7,
      height: height * 0.4,
      resizeMode: 'contain',
      marginBottom: 20,
    },

    title: {
      fontSize: 26,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 10,
      color: theme.textPrimary,
    },

    description: {
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 20,
      color: theme.textPrimary,
      marginBottom: 20,
    },

    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
    },

    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: theme.textPrimary,
    },

    nextButton: {
      position: 'absolute',
      bottom: 60,
      right: 20,
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 30,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },

    nextButtonText: {
      color: theme.surface,
      fontSize: 16,
      fontWeight: 'bold',
    },
    skipButton: {
      position: 'absolute',
      top: 60,
      right: 20,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 30,
      backgroundColor: theme.onboardingSkipColor,
      zIndex: 10,
    },
    skipButtonText: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
  });