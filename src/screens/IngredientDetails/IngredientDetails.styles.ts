import { StyleSheet } from 'react-native';
import { spacing } from '../../themes/spacing';
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
      marginHorizontal: spacing.lg,
      backgroundColor: theme.cardBackground,
      borderRadius: 16,
      padding: spacing.lg,
      shadowColor: theme.textPrimary,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    name: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: spacing.lg,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
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
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.xxl,
      backgroundColor: theme.background,
    },
    primaryButton: {
      width: '100%',
      backgroundColor: theme.primary,
      paddingVertical: spacing.md,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: spacing.md,
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
      paddingVertical: spacing.md,
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
      marginTop: spacing.md,
    },
});
