import { StyleSheet } from 'react-native';
import { spacing } from './spacing';
import type { Theme } from '../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: spacing.lg,
      justifyContent: 'center'
    },
    logo: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginBottom: spacing.xl,
      resizeMode: 'contain',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginBottom: spacing.lg,
    },
    input: {
      flex: 1,
      paddingVertical: spacing.sm,
      fontSize: 16,
      color: theme.textPrimary,
    },
    primaryButton: {
      backgroundColor: theme.primary,
      paddingVertical: spacing.md,
      borderRadius: 6,
      marginTop: spacing.md,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: theme.surface,
      fontWeight: '600',
      letterSpacing: 1,
    },
    footerText: {
      textAlign: 'center',
      marginTop: spacing.xl,
      color: theme.textSecondary,
    },
    link: {
      color: theme.primary,
      fontWeight: '600',
    },
});
