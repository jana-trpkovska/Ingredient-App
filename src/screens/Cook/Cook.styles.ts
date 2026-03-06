import { StyleSheet } from 'react-native';
import { spacing } from '../../themes/spacing';
import type { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.lg,
    },

    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: spacing.md,
    },

    listContent: {
      paddingBottom: 100,
    },

    recipeCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: 14,
      marginBottom: spacing.md,
      overflow: 'hidden',
      elevation: 2,
    },

    recipeCardDisabled: {
      backgroundColor: theme.secondaryBackground,
    },

    recipeImage: {
      width: '100%',
      height: 160,
    },

    recipeInfo: {
      padding: spacing.md,
      backgroundColor: theme.cardBackground,
    },

    recipeTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textPrimary,
    },

    missingText: {
      marginTop: 6,
      fontSize: 13,
      color: theme.textSecondary,
    },

    emptyText: {
      textAlign: 'center',
      marginTop: 40,
      fontSize: 15,
      color: theme.textSecondary,
    },

    addButton: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: 'center',
    },

    addButtonText: {
      color: theme.surface,
      fontSize: 16,
      fontWeight: '600',
    },
});