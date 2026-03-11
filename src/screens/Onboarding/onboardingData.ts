import { ImageSourcePropType } from 'react-native';

export interface OnboardingItemData {
  key: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export const ONBOARDING_DATA: OnboardingItemData[] = [
  {
    key: '1',
    title: 'Discover, Organize & Cook',
    description: 'Your personal kitchen assistant to track and find recipes easily.',
    image: require('../../../assets/images/onboarding1.png'),
  },
  {
    key: '2',
    title: 'Keep Your Ingredients Organized',
    description: 'Add, edit, and track all your ingredients effortlessly.',
    image: require('../../../assets/images/onboarding2.png'),
  },
  {
    key: '3',
    title: 'Get Inspired by Recipes',
    description: 'Discover recipes based on what you already have.',
    image: require('../../../assets/images/onboarding3.png'),
  },
  {
    key: '4',
    title: 'Ready to Start?',
    description: 'Take your kitchen to the next level!',
    image: require('../../../assets/images/onboarding4.png'),
  },
];