import { StyleSheet } from 'react-native';
import { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      paddingBottom: 20,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      width: '100%',
      height: 250,
      backgroundColor: theme.secondaryBackground,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
    },
    infoCard: {
      marginTop: -30,
      marginHorizontal: 24,
      backgroundColor: theme.cardBackground,
      borderRadius: 16,
      padding: 24,
      shadowColor: theme.textPrimary,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    name: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    value: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textPrimary,
    },
    buttonContainer: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 80,
      backgroundColor: theme.background,
    },
    primaryButton: {
      width: '100%',
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 16,
    },
    primaryButtonText: {
      color: theme.surface,
      fontWeight: '600',
      fontSize: 16,
    },
    outlineButton: {
      width: '100%',
      borderWidth: 1,
      borderColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    outlineButtonText: {
      color: theme.primary,
      fontWeight: '600',
      fontSize: 16,
    },
    message: {
      fontSize: 16,
      color: theme.textSecondary,
      marginTop: 16,
    },
});
