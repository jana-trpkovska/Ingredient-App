import { StyleSheet } from "react-native";
import { colors } from '../../themes/colors';
import { spacing } from '../../themes/spacing';

export const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.sm,
    color: colors.textPrimary,
  },

  ingredientListContainer: {
    maxHeight: 300,
    marginBottom: spacing.md,
  },
  ingredientOptionList: {
    paddingBottom: spacing.sm,
  },
  ingredientOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
    elevation: 2,
  },
  ingredientOptionCardSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  ingredientOptionImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  ingredientOptionText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  ingredientOptionTextSelected: {
    fontWeight: '600',
    color: colors.primary,
  },

  searchButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  recipeList: {
    paddingBottom: spacing.lg,
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: 'hidden',
    elevation: 3,
  },
  recipeImage: {
    width: 100,
    height: 100,
  },
  recipeInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  recipeTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: spacing.sm,
  },
  recipeSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  saveButtonSaved: {},
  saveButtonText: {
    marginLeft: spacing.sm,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginVertical: spacing.md,
  },
});