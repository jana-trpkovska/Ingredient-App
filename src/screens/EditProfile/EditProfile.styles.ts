import { StyleSheet } from 'react-native';
import type { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
    },

    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },

    message: {
      fontSize: 16,
      color: theme.textSecondary,
    },

    header: {
      width: '100%',
      height: 160,
      backgroundColor: theme.headerBackground,
    },

    avatar: {
      width: 110,
      height: 110,
      marginTop: -55,
    },

    title: {
      fontSize: 22,
      fontWeight: '700',
      marginTop: 16,
      marginBottom: 16,
      color: theme.textPrimary,
    },

    card: {
      width: '90%',
      backgroundColor: theme.cardBackground,
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,

      shadowColor: theme.textPrimary,
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },

    label: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.textSecondary,
      marginBottom: 6,
    },

    input: {
      fontSize: 16,
      paddingVertical: 8,
      color: theme.textPrimary,
    },

    divider: {
      height: 1,
      backgroundColor: theme.secondaryBackground,
      marginVertical: 16,
    },

    primaryButton: {
      width: '90%',
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
    },

    primaryButtonText: {
      color: theme.surface,
      fontWeight: '600',
      fontSize: 16,
    },
});