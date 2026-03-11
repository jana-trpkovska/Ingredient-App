import { StyleSheet } from 'react-native';
import { spacing } from '../../themes/spacing';
import type { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      backgroundColor: theme.background,
    },

    title: {
      fontSize: 24,
      marginBottom: spacing.md,
      color: theme.textPrimary,
      fontWeight: '600',
    },

    categoryContainer: {
      paddingBottom: spacing.xl,
    },

    categoryItem: {
      alignItems: 'center',
      marginRight: spacing.md,
    },

    categoryImage: {
      width: 60,
      height: 60,
      marginBottom: 6,
    },

    categoryImageSelected: {
      borderWidth: 2,
      borderRadius: 12,
      borderColor: theme.success,
    },

    categoryText: {
      fontSize: 12,
      color: theme.textSecondary,
    },

    categoryTextSelected: {
      color: theme.success,
      fontWeight: '600',
    },

    listContent: {
      paddingBottom: 120,
    },

    message: {
      fontSize: 16,
      color: theme.textSecondary,
      marginTop: spacing.lg,
      textAlign: 'center',
    },

    fixedButton: {
      position: 'absolute',
      bottom: 16,
      left: spacing.lg,
      right: spacing.lg,
      backgroundColor: theme.primary,
      paddingVertical: spacing.md,
      borderRadius: 8,
      alignItems: 'center',
    },

    fixedButtonText: {
      color: theme.surface,
      fontWeight: '600',
      fontSize: 16,
    },

    contentWrapper: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: spacing.md,
      paddingBottom: 140,
    },

    emptyContainer: {
      alignItems: 'center',
      marginTop: 60,
      paddingHorizontal: 30,
    },

    emptyImage: {
      width: 220,
      height: 220,
      resizeMode: 'contain',
      marginBottom: 20,
    },

    categoryEmptyImage: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      marginBottom: 16,
    },

    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.textPrimary,
      marginBottom: 8,
    },

    emptySubtitle: {
      fontSize: 14,
      textAlign: 'center',
      color: theme.textSecondary,
      marginBottom: 24,
      lineHeight: 20,
    },
  });