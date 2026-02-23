import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { spacing } from '../../themes/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  listContent: {
    paddingBottom: 100,
  },

  recipeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 14,
    marginBottom: spacing.md,
    overflow: 'hidden',
    elevation: 2,
  },

  recipeCardDisabled: {
    backgroundColor: colors.secondaryBackground,
  },

  recipeImage: {
    width: '100%',
    height: 160,
  },

  recipeInfo: {
    padding: spacing.md,
  },

  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  missingText: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textSecondary,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
    color: colors.textSecondary,
  },

  addButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});